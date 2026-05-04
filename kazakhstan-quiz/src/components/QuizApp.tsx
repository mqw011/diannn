"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
import { Question, QuizPhase, WrongAnswer } from "@/types/quiz";
import QuestionCard from "./QuestionCard";
import Results from "./Results";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizApp() {
  const [phase, setPhase] = useState<QuizPhase>("idle");
  const [questionCount, setQuestionCount] = useState<number>(questions.length);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);

  const startQuiz = (count: number) => {
    // Shuffle and select
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    
    // Shuffle options for each question
    const withShuffledOptions = selected.map(q => ({
      ...q,
      options: [...q.options].sort(() => 0.5 - Math.random())
    }));

    setActiveQuestions(withShuffledOptions);
    setQuestionCount(count);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setPhase("question");
  };

  const handleAnswer = (selectedOption: string) => {
    const currentQ = activeQuestions[currentIndex];
    if (selectedOption === currentQ.correctAnswer) {
      setScore(s => s + 1);
    } else {
      setWrongAnswers(prev => [...prev, { question: currentQ, selected: selectedOption }]);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setPhase("results");
    }
  };

  const resetQuiz = () => {
    setPhase("idle");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 tracking-tight">
              История Казахстана
            </h1>
            <p className="text-lg text-neutral-600 mb-10 max-w-lg mx-auto">
              Проверьте свои знания о великих эпохах, битвах и выдающихся личностях Казахского ханства и современной истории.
            </p>
            
            <div className="space-y-4 max-w-sm mx-auto">
              <p className="font-medium text-neutral-500 uppercase tracking-wider text-sm mb-4">
                Выберите количество вопросов
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={() => startQuiz(5)} className="w-full py-3 px-6 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-xl transition-colors duration-200">
                  5 вопросов (Быстрый тест)
                </button>
                <button onClick={() => startQuiz(Math.min(20, questions.length))} className="w-full py-3 px-6 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-xl transition-colors duration-200">
                  20 вопросов
                </button>
                <button onClick={() => startQuiz(questions.length)} className="w-full py-4 px-6 bg-blue-600 text-white hover:bg-blue-700 shadow-md font-bold rounded-xl transition-colors duration-200">
                  Все вопросы ({questions.length})
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <QuestionCard 
              question={activeQuestions[currentIndex]}
              currentIndex={currentIndex}
              totalQuestions={activeQuestions.length}
              onAnswer={handleAnswer}
              onNext={nextQuestion}
            />
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
          >
            <Results 
              score={score}
              total={activeQuestions.length}
              wrongAnswers={wrongAnswers}
              onRestart={resetQuiz}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
