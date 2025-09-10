# Question Bank FastAPI Backend

## Setup and Running

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server:**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **API will be available at:**
   - API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - Alternative docs: http://localhost:8000/redoc

## API Endpoints

### POST /save
Save question with related topics.

**Request Body:**
```json
{
  "id": 1,
  "question": "What is the capital of France?",
  "subject": "Geography",
  "relatedTopics": "France, Europe, capitals, geography"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Saved related topics for question ID 1",
  "data": {
    "id": 1,
    "question": "What is the capital of France?",
    "subject": "Geography",
    "relatedTopics": "France, Europe, capitals, geography",
    "savedAt": "2024-01-10T15:30:00"
  }
}
```

### GET /submissions
Get all saved submissions.

### GET /submissions/{question_id}
Get a specific submission by question ID.

## Data Storage

Submissions are stored in `data/submissions.json` file. The backend automatically creates this directory and file when needed.

## CORS

The backend is configured to allow CORS requests from:
- http://localhost:8080 (Vite dev server)
- http://localhost:3000 (Alternative React dev server)
- http://127.0.0.1:8080