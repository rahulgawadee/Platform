from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import courses  # Correct import
from app.routers import auth

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
