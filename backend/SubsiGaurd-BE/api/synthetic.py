from fastapi import APIRouter, Query
from services.synthetic_data import generate_synthetic_data
from models.schemas import SyntheticDataResponse

router = APIRouter()

@router.get("/synthetic", response_model=SyntheticDataResponse)
async def get_synthetic_data(rows: int = Query(default=100, ge=1, le=10000)):
    data = generate_synthetic_data(rows)
    return SyntheticDataResponse(
        count=len(data),
        data=data
    )
