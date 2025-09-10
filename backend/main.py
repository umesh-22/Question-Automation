from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import os
from datetime import datetime

app = FastAPI(title="Question Bank API", description="API for saving question related topics")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionSubmission(BaseModel):
    id: int
    question: str
    subject: str
    relatedTopics: str

# Create data directory if it doesn't exist
os.makedirs("data", exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Question Bank API is running"}

@app.post("/save")
async def save_question_topics(submission: QuestionSubmission):
    """
    Save question with related topics to a JSON file
    """
    try:
        # Create a record with timestamp
        record = {
            "id": submission.id,
            "question": submission.question,
            "subject": submission.subject,
            "relatedTopics": submission.relatedTopics,
            "savedAt": datetime.now().isoformat(),
        }
        
        # Load existing data
        data_file = "data/submissions.json"
        submissions = []
        
        if os.path.exists(data_file):
            try:
                with open(data_file, "r", encoding="utf-8") as f:
                    submissions = json.load(f)
            except (json.JSONDecodeError, FileNotFoundError):
                submissions = []
        
        # Check if this question ID already exists and update it
        existing_index = None
        for i, existing_submission in enumerate(submissions):
            if existing_submission["id"] == submission.id:
                existing_index = i
                break
        
        if existing_index is not None:
            # Update existing record
            submissions[existing_index] = record
            message = f"Updated related topics for question ID {submission.id}"
        else:
            # Add new record
            submissions.append(record)
            message = f"Saved related topics for question ID {submission.id}"
        
        # Save back to file
        with open(data_file, "w", encoding="utf-8") as f:
            json.dump(submissions, f, indent=2, ensure_ascii=False)
        
        return {
            "success": True,
            "message": message,
            "data": record
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save submission: {str(e)}")

@app.get("/submissions")
async def get_submissions():
    """
    Retrieve all saved submissions
    """
    try:
        data_file = "data/submissions.json"
        
        if not os.path.exists(data_file):
            return {"submissions": []}
        
        with open(data_file, "r", encoding="utf-8") as f:
            submissions = json.load(f)
        
        return {"submissions": submissions}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve submissions: {str(e)}")

@app.get("/submissions/{question_id}")
async def get_submission(question_id: int):
    """
    Get a specific submission by question ID
    """
    try:
        data_file = "data/submissions.json"
        
        if not os.path.exists(data_file):
            raise HTTPException(status_code=404, detail="Submission not found")
        
        with open(data_file, "r", encoding="utf-8") as f:
            submissions = json.load(f)
        
        for submission in submissions:
            if submission["id"] == question_id:
                return {"submission": submission}
        
        raise HTTPException(status_code=404, detail="Submission not found")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve submission: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)