"use client";

import { useState } from "react";
import QuizApp from "@/components/QuizApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex items-center justify-center p-4">
      <QuizApp />
    </main>
  );
}
