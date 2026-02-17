from fastapi import APIRouter, HTTPException, Depends
from models.schemas import AnalysisResult
from services.data_storage import data_storage
from api.database import get_db
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter()

@router.get("/results/{file_id}", response_model=AnalysisResult)
async def get_results(file_id: str, session: AsyncSession = Depends(get_db)):
    results = await data_storage.get_results(session, file_id)
    
    if results is None:
        raise HTTPException(status_code=404, detail="Results not found. Please analyze the file first.")

@router.get("/reports/summary")
async def get_reports_summary(session: AsyncSession = Depends(get_db)):
    all_results = await data_storage.get_all_results(session)
    
    total_audits = 0
    flagged_count = 0
    resolved_cases = 0
    total_leakage = 0.0
    
    # Simple aggregation
    for res in all_results:
        # Check if result structure matches expected format
        if "summary" in res:
            summary = res["summary"]
            # Assuming 'total_records' corresponds to auditable units/beneficiaries in that file
            file_records = summary.get("total_records", 0)
            file_flagged = summary.get("flagged_count", 0)
            file_leakage = summary.get("total_leakage_amount", 0.0)
            
            total_audits += file_records
            flagged_count += file_flagged
            total_leakage += file_leakage
    
    resolved_cases = total_audits - flagged_count
    
    return {
        "total_audits": total_audits,
        "critical_issues": flagged_count,
        "resolved_cases": resolved_cases,
        "total_leakage": total_leakage
    }
    
from fastapi.responses import StreamingResponse
import pandas as pd
import io

@router.get("/results/{file_id}/export")
async def export_results(file_id: str, session: AsyncSession = Depends(get_db)):
    results = await data_storage.get_results(session, file_id)
    
    if results is None:
        raise HTTPException(status_code=404, detail="Results not found. Please analyze the file first.")
    
    # Flatten data for CSV
    # Summary row
    summary_data = {
        "Type": "Summary",
        "Total Leakage": results.summary.total_leakage_amount,
        "Flagged Count": results.summary.flagged_count,
        "Total Records": results.summary.total_records,
        "Avg Risk Score": results.summary.average_risk_score,
        "Top Risk State": results.summary.top_risk_state
    }
    
    # Case rows
    case_data = []
    for case in results.cases:
        case_data.append({
            "Type": "Fraud Case",
            "Beneficiary Name": case.beneficiary_name,
            "Scheme": case.scheme,
            "Amount": case.amount,
            "Risk Score": case.risk_score,
            "Fraud Reasons": ", ".join(case.fraud_reasons)
        })
    
    # Combine (putting summary at top is unconventional for strict CSVs but good for reports)
    # Better approach: Just export the fraud cases for detailed analysis
    df = pd.DataFrame(case_data)
    
    stream = io.StringIO()
    df.to_csv(stream, index=False)
    
    response = StreamingResponse(iter([stream.getvalue()]),
                                 media_type="text/csv")
    response.headers["Content-Disposition"] = f"attachment; filename=subsiguard_report_{file_id}.csv"
    return response
