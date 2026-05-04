"use client";

import { useState, useEffect } from "react";
import { Question } from "@/types/quiz";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (selected: string) => void;
  onNext: () => void;
}

export default function QuestionCard({ question, currentIndex, totalQuestions, onAnswer, onNext }: Props) {
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOpt(null);
    setIsAnswered(false);
  }, [question]);

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);
    onAnswer(opt);
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl w-full">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <span className="text-sm font-bold tracking-wider text-blue-500 uppercase">
            Вопрос {currentIndex + 1} из {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
          <motion.div 
            className="bg-blue-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8 leading-snug">
        {question.question}
      </h2>

      <div className="space-y-3 mb-8">
        {question.options.map((opt, i) => {
          const isSelected = selectedOpt === opt;
          const isCorrect = opt === question.correctAnswer;
          
          let stateClass = "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700";
          
          if (isAnswered) {
            if (isCorrect) {
              stateClass = "bg-green-50 border-green-500 text-green-800 shadow-sm";
            } else if (isSelected && !isCorrect) {
              stateClass = "bg-red-50 border-red-400 text-red-800 shadow-sm";
            } else {
              stateClass = "bg-neutral-50 border-transparent text-neutral-400 opacity-60";
            }
          } else if (isSelected) {
            // intermediate state before answering (though we answer immediately)
            stateClass = "bg-blue-50 border-blue-400 text-blue-800";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={isAnswered}
              className={clsx(
                "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4",
                stateClass,
                !isAnswered && "cursor-pointer active:scale-[0.98]"
              )}
            >
              <div className="flex-1 text-base md:text-lg leading-relaxed">
                {opt}
              </div>
              {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-end mt-4"
          >
            <button
              onClick={onNext}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
            >
              {currentIndex < totalQuestions - 1 ? "Следующий вопрос" : "Показать результаты"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
