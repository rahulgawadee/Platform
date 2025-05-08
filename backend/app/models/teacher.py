from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from datetime import datetime
from uuid import uuid4


class Resource(BaseModel):
    title: str
    file_url: HttpUrl  # or use str if storing file paths
    file_type: str     # e.g., 'pdf', 'zip', etc.


class VideoLecture(BaseModel):
    title: str
    video_url: HttpUrl
    duration_minutes: Optional[float]
    is_preview: bool = False


class Lecture(BaseModel):
    lecture_type: str  # 'video', 'resource', 'quiz', etc.
    content: VideoLecture | Resource  # Use Union if you're on Python <3.10


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
