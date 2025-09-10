# Question Bank CSV Viewer

A modern React application for browsing and managing large CSV datasets with pagination and form functionality. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- ✨ **CSV Data Loading**: Parse and display large CSV files (tested with 200k+ rows)
- 📄 **Pagination**: Efficient pagination showing 15 questions per page
- 🎯 **Question Details**: Click any question to add related topics
- 💾 **Data Persistence**: Save related topics via FastAPI backend
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🚀 **Performance**: Optimized for large datasets with smooth navigation

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn/ui for component library
- React Router for navigation
- PapaParse for CSV parsing
- Axios for API calls

**Backend:**
- FastAPI with Python
- Pydantic for data validation
- JSON file storage
- CORS enabled for frontend communication

## Quick Start

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at http://localhost:8080

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server:**
   ```bash
   python main.py
   ```
   
   The API will be available at:
   - API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Usage

1. **Browse Questions**: The home page displays questions with pagination
2. **View Details**: Click any question to open the form page
3. **Add Related Topics**: Enter relevant topics and save
4. **Navigate**: Use pagination controls to browse through all questions

## CSV Format

The CSV file should have the following columns:
- `id`: Unique identifier for each question
- `question`: The question text
- `subject`: Subject category

Example:
```csv
id,question,subject
1,"What is the capital of France?","Geography"
2,"How do you declare a variable in JavaScript?","Programming"
```

## API Endpoints

- `POST /save` - Save question with related topics
- `GET /submissions` - Retrieve all saved submissions
- `GET /submissions/{id}` - Get specific submission by ID

## Project Structure

```
src/
├── components/
│   ├── Home.tsx          # Main question listing page
│   ├── QuestionForm.tsx  # Question detail form
│   └── ui/              # Shadcn UI components
├── types/
│   └── Question.ts       # TypeScript interfaces
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── pages/               # Page components

backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
└── data/               # JSON data storage
```

## Development

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend Development:**
- The FastAPI server includes hot reload
- API documentation available at `/docs`
- Data stored in `backend/data/submissions.json`

## Deployment

**Frontend:**
Simply open [Lovable](https://lovable.dev/projects/043b3efa-2b65-4842-8524-110c176ea3c5) and click on Share → Publish.

**Backend:**
Deploy the FastAPI backend to your preferred hosting service (Heroku, Railway, DigitalOcean, etc.).

## Performance Notes

- Optimized for large CSV files (200k+ rows)
- Client-side pagination for smooth navigation
- Lazy loading and efficient rendering
- Minimal API calls for better performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
