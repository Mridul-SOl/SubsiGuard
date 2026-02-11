from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import JSON, Column
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from pydantic import ConfigDict, BaseModel

# --- Database Models ---

class UploadedFile(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    filename: str
    upload_date: datetime = Field(default_factory=datetime.utcnow)
    data: Dict[str, Any] = Field(sa_column=Column(JSON)) # Stores the CSV data as JSON
    
    # Relationship to results
    analysis_results: List["AnalysisResultDB"] = Relationship(back_populates="file")

    model_config = ConfigDict(arbitrary_types_allowed=True)

class AnalysisResultDB(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    file_id: str = Field(foreign_key="uploadedfile.id")
    result: Dict[str, Any] = Field(sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    file: Optional[UploadedFile] = Relationship(back_populates="analysis_results")

    model_config = ConfigDict(arbitrary_types_allowed=True)

# --- Pydantic / API Models ---

class UploadResponse(BaseModel):
    file_id: str
    preview: List[Dict[str, Any]]
    message: str

class AnalyzeRequest(BaseModel):
    file_id: str

class FraudRecord(BaseModel):
    record_id: int
    data: Dict[str, Any]
    fraud_score: float
    is_fraud: bool
    reasons: List[str]

class AnalysisResult(BaseModel):
    file_id: str
    total_records: int
    flagged_count: int
    leakage_percent: float
    high_risk_states: List[str]
    flagged_records: List[FraudRecord]

class SyntheticDataResponse(BaseModel):
    count: int
    data: List[Dict[str, Any]]
