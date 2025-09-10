import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { Question } from '@/types/Question';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const QUESTIONS_PER_PAGE = 15;

const Home = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/questions.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedQuestions = results.data.map((row: any, index: number) => ({
              id: parseInt(row.id) || index + 1,
              question: (row.question || '').replace(/\\n/g, '\n'),
              subject: row.subject || ''
            }));
            setQuestions(parsedQuestions);
            setLoading(false);
          },
          error: (error) => {
            setError('Failed to parse CSV file');
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Failed to load questions');
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const handleQuestionClick = (question: Question) => {
    navigate(`/question/${question.id}`, { state: { question } });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-destructive text-center">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Question Bank</h1>
          </div>
          <p className="text-muted-foreground">
            Browse through {questions.length.toLocaleString()} questions. Click on any question to add related topics.
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {currentQuestions.map((question, index) => (
            <Card 
              key={question.id} 
              className="cursor-pointer hover:shadow-medium transition-all duration-200 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/50"
              onClick={() => handleQuestionClick(question)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {question.subject}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        #{question.id}
                      </span>
                    </div>
                    <p className="text-foreground font-medium leading-relaxed whitespace-pre-line">
                      {question.question}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <span className="text-xs text-muted-foreground">
                ({startIndex + 1}-{Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length)} of {questions.length})
              </span>
            </div>

            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;