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
    
    return results
