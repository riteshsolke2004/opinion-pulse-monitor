from fastapi import APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["sentimentDB"]
collection = db["reviews"]

# Pydantic model for review submission
class ReviewData(BaseModel):
    text: str
    sentiment: str
    score: int
    confidence: float

@router.post("/api/submit-review")
async def submit_review(data: ReviewData):
    review_doc = {
        "text": data.text,
        "sentiment": data.sentiment,
        "score": data.score,
        "confidence": data.confidence,
        "timestamp": datetime.utcnow()
    }
    result = await collection.insert_one(review_doc)
    return {"message": "Review stored", "id": str(result.inserted_id)}
