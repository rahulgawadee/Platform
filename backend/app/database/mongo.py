from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING

try:
    mongodb = AsyncIOMotorClient("mongodb://localhost:27017")
    db = mongodb.liahub_db  # Database name
    courses_collection = db.course
    print("MongoDB connection successful!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# ✅ Add this:
async def get_db():
    return db
