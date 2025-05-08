from motor.motor_asyncio import AsyncIOMotorClient

from pymongo import ASCENDING

try:
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.liahub_db  # Database name
    courses_collection = db.course  # Collection
    print("MongoDB connection successful!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
