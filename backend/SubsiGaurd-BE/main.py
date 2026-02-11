from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import upload, analyze, results, synthetic

from contextlib import asynccontextmanager
from api.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="SubsiGuard Backend",
    description="Backend for SubsiGuard Fraud Detection System",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(upload.router, tags=["Upload"])
app.include_router(analyze.router, tags=["Analyze"])
app.include_router(results.router, tags=["Results"])
app.include_router(synthetic.router, tags=["Synthetic Data"])

@app.get("/")
async def root():
    return {"message": "SubsiGuard Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
