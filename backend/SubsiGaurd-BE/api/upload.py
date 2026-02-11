from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import pandas as pd
import uuid
import io
from services.data_storage import data_storage
from models.schemas import UploadResponse
from api.database import get_db
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...), session: AsyncSession = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
    
    try:
        content = await file.read()
        df = pd.read_csv(io.BytesIO(content))
        
        # Basic validation
        required_columns = ["aadhaar", "amount", "income"]
        if not all(col in df.columns for col in required_columns):
             raise HTTPException(status_code=400, detail=f"Missing required columns: {required_columns}")

        file_id = str(uuid.uuid4())
        await data_storage.save_upload(session, file_id, file.filename, df)
        
        preview = df.head(10).fillna("").to_dict(orient="records")
        
        return UploadResponse(
            file_id=file_id,
            preview=preview,
            message="File uploaded successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
