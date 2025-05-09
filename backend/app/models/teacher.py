from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        return str(ObjectId(v)) if isinstance(v, ObjectId) else str(v)

class Lesson(BaseModel):
    title: str
    video_url: Optional[str] = None
    duration: Optional[str] = None
    resource_url: Optional[str] = None
    summary: Optional[str] = None

class QuizQuestion(BaseModel):
    question: str
    options: List[str] = Field(..., min_items=4, max_items=4)
    correct_answer: int = Field(..., ge=0, le=3)

class Quiz(BaseModel):
    title: str = Field(default_factory=lambda: "Module Quiz")
    questions: List[QuizQuestion] = []

class Module(BaseModel):
    title: str
    description: Optional[str] = None
    lessons: List[Lesson] = []
    quiz: Optional[Quiz] = None

class CourseBase(BaseModel):
    title: str
    description: str
    category: str
    thumbnail_url: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: Optional[PyObjectId] = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    modules: List[Module] = []

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat()
        }
