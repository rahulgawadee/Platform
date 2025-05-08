from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import courses  # Correct import
from app.routers import auth
from motor.motor_asyncio import AsyncIOMotorClient
from app.routers import teacher_courses


app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root path
@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

# Include course routes
app.include_router(courses.router)
app.include_router(auth.router)
app.include_router(teacher_courses.router)

# Optional entry point to run app directly (avoids subprocess issues with --reload on Windows)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
