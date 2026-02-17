from sqlmodel import SQLModel, create_engine
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
from typing import AsyncGenerator
from models.schemas import UploadedFile, AnalysisResultDB  # Import models to register them

# Database URL
import os
IS_VERCEL = os.environ.get("VERCEL") == "1"

if IS_VERCEL:
    DATABASE_URL = "sqlite+aiosqlite:///:memory:"
else:
    DATABASE_URL = "sqlite+aiosqlite:///./subsiguard.db"

# Create Async Engine
# check_same_thread=False is needed for SQLite
engine = create_async_engine(
    DATABASE_URL, 
    echo=True, 
    future=True,
    connect_args={"check_same_thread": False}
)

# Create Async Session
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session

async def init_db():
    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
