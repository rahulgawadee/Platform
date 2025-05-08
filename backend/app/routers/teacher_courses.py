from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import uuid4
from datetime import datetime

from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, Union

# ------------------------
# Schemas
# ------------------------

class Resource(BaseModel):
    title: str
    file_url: HttpUrl
    file_type: str  # pdf, zip, etc.

class VideoLecture(BaseModel):
    title: str
    video_url: HttpUrl
    duration_minutes: Optional[float]
    is_preview: bool = False

class Lecture(BaseModel):
    lecture_type: str  # video, resource, quiz, etc.
    content: Union[VideoLecture, Resource]

class Section(BaseModel):
    title: str
    lectures: List[Lecture]

class CourseCreate(BaseModel):
    teacher_id: str
    title: str
    subtitle: Optional[str]
    description: str
    category: str
    subcategory: Optional[str]
    level: str  # Beginner, Intermediate, Expert
    language: str
    price: float
    thumbnail_url: Optional[HttpUrl]
    sections: List[Section]
    tags: Optional[List[str]] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ------------------------
# Router setup
# ------------------------

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

# Temporary in-memory database (simulate)
fake_courses_db = []


# ------------------------
# Routes
# ------------------------

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_course(course: CourseCreate):
    course_data = course.dict()
    course_data["id"] = str(uuid4())
    fake_courses_db.append(course_data)
    return {
        "message": "Course created successfully",
        "course_id": course_data["id"]
    }


@router.get("/", response_model=List[CourseCreate])
async def get_all_courses():
    return fake_courses_db


@router.get("/{course_id}", response_model=CourseCreate)
async def get_course_by_id(course_id: str):
    course = next((c for c in fake_courses_db if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
