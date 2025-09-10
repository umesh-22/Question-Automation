import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Question, QuestionSubmission } from '@/types/Question';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuestionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const question: Question = location.state?.question;
  const [questionText, setQuestionText] = useState(question?.question || '');
  const [subject, setSubject] = useState(question?.subject || '');
  const [relatedTopics, setRelatedTopics] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-center text-muted-foreground mb-4">Question not found</p>
          <Button onClick={() => navigate('/')} variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!relatedTopics.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter some related topics.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: QuestionSubmission = {
        id: question.id,
        question: questionText.trim(),
        subject: subject.trim(),
        relatedTopics: relatedTopics.trim()
      };

      // Replace with your actual API endpoint
      await axios.post('http://localhost:8000/save', submission);
      
      toast({
        title: "Success!",
        description: "Related topics saved successfully.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save related topics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </Button>

          <Card className="shadow-medium bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                  {question.subject}
                </span>
                Question #{question.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="question" className="text-sm font-medium text-foreground">
                    Question
                  </Label>
                  <Textarea
                    id="question"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="mt-2 min-h-[80px] resize-none whitespace-pre-line"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="relatedTopics" className="text-sm font-medium text-foreground">
                    Related Topics
                  </Label>
                  <Textarea
                    id="relatedTopics"
                    placeholder="Enter related topics, concepts, or keywords separated by commas..."
                    value={relatedTopics}
                    onChange={(e) => setRelatedTopics(e.target.value)}
                    className="mt-2 min-h-[120px] resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Examples: algorithms, data structures, complexity analysis
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Related Topics
                      </div>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;