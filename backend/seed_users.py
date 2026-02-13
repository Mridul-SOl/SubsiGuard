from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker
from api.database import engine, init_db
from models.schemas import User
import asyncio

async def seed_users():
    await init_db()
    
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    
    async with async_session() as session:
        # Check if admin already exists
        statement = select(User).where(User.username == "admin")
        result = await session.exec(statement)
        user = result.first()
        
        if not user:
            print("Creating default admin user...")
            admin_user = User(
                username="admin",
                password_hash="admin",  # In prod, hash this!
                role="admin",
                full_name="System Administrator"
            )
            session.add(admin_user)
            await session.commit()
            print("✅ Admin user created (admin/admin)")
        else:
            print("ℹ️ Admin user already exists")

if __name__ == "__main__":
    asyncio.run(seed_users())
