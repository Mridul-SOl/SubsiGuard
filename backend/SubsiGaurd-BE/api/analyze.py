from fastapi import APIRouter, HTTPException, Depends
from models.schemas import AnalyzeRequest, AnalysisResult
from services.data_storage import data_storage
from services.fraud_detection import FraudDetector
from api.database import get_db
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter()
detector = FraudDetector()

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_data(request: AnalyzeRequest, session: AsyncSession = Depends(get_db)):
    df = await data_storage.get_data(session, request.file_id)
    
    if df is None:
        raise HTTPException(status_code=404, detail="File not found. Please upload first.")
    
    try:
        # Check if results already exist to avoid re-calculation
        existing_results = await data_storage.get_results(session, request.file_id)
        if existing_results:
             return existing_results

        results = detector.detect_fraud(request.file_id, df)
        
        # Convert Pydantic model to dict for storage
        await data_storage.save_results(session, request.file_id, results.model_dump())
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
