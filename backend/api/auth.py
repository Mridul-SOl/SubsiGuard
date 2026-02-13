from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from api.database import get_db as get_session
from models.schemas import User, LoginRequest, LoginResponse
import uuid

router = APIRouter()

@router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest, session: Session = Depends(get_session)):
    # Find user
    statement = select(User).where(User.username == request.username)
    result = await session.exec(statement)
    user = result.first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password (simple matching for MVP, should use hashing in prod)
    if user.password_hash != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    # Generate simple session token
    token = str(uuid.uuid4())
    
    return LoginResponse(
        success=True,
        user={
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "full_name": user.full_name
        },
        token=token,
        message="Login successful"
    )
