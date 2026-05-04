"use client";

import { WrongAnswer } from "@/types/quiz";
import { RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  score: number;
  total: number;
  wrongAnswers: WrongAnswer[];
  onRestart: () => void;
}

export default function Results({ score, total, wrongAnswers, onRestart }: Props) {
  const percentage = Math.round((score / total) * 100);
  
  let comment = "";
  if (percentage === 100) comment = "Идеально! Вы отлично знаете историю.";
  else if (percentage >= 80) comment = "Отличный результат!";
  else if (percentage >= 50) comment = "Хорошо, но есть куда расти.";
  else comment = "Вам стоит еще раз повторить материал.";

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-neutral-800 mb-4">Результаты</h2>
        
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-50 text-blue-600 mb-6 border-4 border-blue-100">
          <span className="text-4xl font-black">{percentage}%</span>
        </div>
        
        <p className="text-xl text-neutral-600 mb-2">
          Правильных ответов: <span className="font-bold text-neutral-800">{score}</span> из {total}
        </p>
        <p className="text-lg font-medium text-blue-600">{comment}</p>
      </div>

      {wrongAnswers.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-neutral-800 mb-6 border-b pb-4">
            Работа над ошибками
          </h3>
          <div className="space-y-6">
            {wrongAnswers.map((item, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                <p className="font-bold text-neutral-800 mb-4 text-lg">
                  {item.question.question}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex gap-3 text-red-700 bg-red-50 p-4 rounded-xl items-start">
                    <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-70">Ваш ответ</p>
                      <p>{item.selected}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 text-green-800 bg-green-50 p-4 rounded-xl items-start">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-70">Правильный ответ</p>
                      <p>{item.question.correctAnswer}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-900 p-5 rounded-xl text-sm leading-relaxed border border-blue-100">
                  <span className="font-bold uppercase tracking-wider text-xs block mb-2 opacity-70">Пояснение</span>
                  {item.question.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-neutral-800 transition-colors shadow-lg active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Пройти тест заново
        </button>
      </div>
    </div>
  );
}
