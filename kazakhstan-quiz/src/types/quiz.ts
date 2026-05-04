export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface WrongAnswer {
  question: Question;
  selected: string;
}

export type QuizPhase = "idle" | "question" | "results";
