from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from models.schemas import UploadedFile, AnalysisResultDB
from typing import Optional, Dict, Any, List
import pandas as pd
import json

class DataStorageService:
    async def save_upload(self, session: AsyncSession, file_id: str, filename: str, df: pd.DataFrame) -> None:
        # Convert DataFrame to JSON-compatible list of dicts
        data_json = df.to_dict(orient="records")
        
        upload = UploadedFile(
            id=file_id, 
            filename=filename, 
            data={"records": data_json} # Wrapping in a dict for flexibility
        )
        session.add(upload)
        await session.commit()
    
    async def get_data(self, session: AsyncSession, file_id: str) -> Optional[pd.DataFrame]:
        statement = select(UploadedFile).where(UploadedFile.id == file_id)
        result = await session.exec(statement)
        uploaded_file = result.first()
        
        if uploaded_file and uploaded_file.data:
            # Convert JSON back to DataFrame
            records = uploaded_file.data.get("records", [])
            return pd.DataFrame(records)
        return None

    async def save_results(self, session: AsyncSession, file_id: str, results: Dict[str, Any]) -> None:
        # Convert Pydantic models in results to dicts if necessary (FastAPI/Pydantic usually handles this, but let's be safe)
        # results is likely a dict from AnalysisResult model
        
        result_db = AnalysisResultDB(file_id=file_id, result=results)
        session.add(result_db)
        await session.commit()

    async def get_results(self, session: AsyncSession, file_id: str) -> Optional[Dict[str, Any]]:
        statement = select(AnalysisResultDB).where(AnalysisResultDB.file_id == file_id)
        result = await session.exec(statement)
        db_result = result.first()
        
        if db_result:
            return db_result.result
        return None

    async def get_all_results(self, session: AsyncSession) -> List[Dict[str, Any]]:
        statement = select(AnalysisResultDB)
        results = await session.exec(statement)
        return [db_result.result for db_result in results.all()]

data_storage = DataStorageService()
