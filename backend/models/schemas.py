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
    filename: str
    total_rows: int
    preview_rows: List[Dict[str, Any]]
    message: str

class AnalyzeRequest(BaseModel):
    file_id: str

class FraudRecord(BaseModel):
    record_id: int
    data: Dict[str, Any]
    fraud_score: float
    is_fraud: bool
    reasons: List[str]

class FraudCase(BaseModel):
    id: str
    beneficiary_name: str
    scheme: str
    amount: float
    risk_score: int
    fraud_reasons: List[str]

class AnalysisSummary(BaseModel):
    total_leakage_amount: float
    flagged_count: int
    total_records: int
    average_risk_score: int
    top_risk_state: str

class AnalysisReportDetails(BaseModel):
    executive_summary: str
    key_findings: List[str]
    recommendations: List[str]
    conclusion: str

class AnalysisResult(BaseModel):
    file_id: str
    summary: AnalysisSummary
    cases: List[FraudCase]
    report_details: Optional[AnalysisReportDetails] = None

class SyntheticDataResponse(BaseModel):
    count: int
    data: List[Dict[str, Any]]

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    password_hash: str
    role: str = Field(default="admin")
    full_name: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    success: bool
    user: Dict[str, Any]
    token: str # Simple token for now
    message: str
