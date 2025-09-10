export interface Question {
  id: number;
  question: string;
  subject: string;
}

export interface QuestionSubmission {
  id: number;
  question: string;
  subject: string;
  relatedTopics: string;
}