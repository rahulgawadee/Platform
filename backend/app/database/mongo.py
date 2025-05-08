from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.liahub_db  # Database name
courses_collection = db.courses  # Collection
