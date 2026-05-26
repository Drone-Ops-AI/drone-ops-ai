import React, { useState } from "react";
import { examQuestions } from "../data/faaData";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, Award, RotateCcw, HelpCircle } from "lucide-react";

interface ExamEngineProps {
  questions: any[];
  currentQuestionIndex: number;
  completedQuestions: Record<string, number>; // questionId -> selectedIndex
  examFinished: boolean;
  score: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onSubmitQuestion: () => void;
  onJumpToQuestion: (index: number) => void;
  onRestartExam: () => void;
  onFinishExam: () => void;
  examMode: "full" | "quick" | "drill";
  onChangeMode: (mode: "full" | "quick" | "drill") => void;
}

export default function ExamEngine({
  questions,
  currentQuestionIndex,
  completedQuestions,
  examFinished,
  score,
  correctAnswersCount,
  incorrectAnswersCount,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
  onSubmitQuestion,
  onJumpToQuestion,
  onRestartExam,
  onFinishExam,
  examMode,
  onChangeMode
}: ExamEngineProps) {
  
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;
  
  // Has the user answered the current question?
  const hasAnsweredCurrent = currentQuestion && (currentQuestion.id in completedQuestions);
  const loggedAnswer = currentQuestion ? completedQuestions[currentQuestion.id] : undefined;

  // Helper to check what color an option should be
  const getOptionClasses = (idx: number) => {
    if (!currentQuestion) return "";
    // If the exam is completely finished or the user has already locked an answer for this question
    if (hasAnsweredCurrent) {
      const isCorrectOption = idx === currentQuestion.correctIndex;
      const isUserOption = idx === loggedAnswer;

      if (isCorrectOption) {
        return "bg-emerald-500/10 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-bold";
      }
      if (isUserOption && !isCorrectOption) {
        return "bg-red-500/10 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
      }
      return "bg-zinc-950/40 border-white/5 text-zinc-600 opacity-40";
    }

    // Active pending selection
    if (selectedAnswer === idx) {
      return "bg-cyan-500/10 border-cyan-400 text-white font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/20";
    }

    return "bg-zinc-950/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 hover:border-zinc-800 transition-all cursor-pointer";
  };

  const getQuestionStatusMarker = (idx: number) => {
    if (!questions[idx]) return "";
    const questionId = questions[idx].id;
    const isAnswered = questionId in completedQuestions;

    if (examFinished) {
      const isCorrect = completedQuestions[questionId] === questions[idx].correctIndex;
      return isCorrect 
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/35 cyber-glow-emerald" 
        : "bg-red-500/10 text-red-400 border-red-500/35";
    }

    if (isAnswered) {
      return "bg-cyan-500/10 text-cyan-400 border-cyan-400/35 cyber-glow-cyan";
    }

    if (idx === currentQuestionIndex) {
      return "bg-zinc-100 text-zinc-950 border-white font-black";
    }

    return "bg-zinc-950/60 text-zinc-500 border-white/5 hover:bg-zinc-900/50 hover:text-zinc-300 hover:border-zinc-800";
  };

  const passRate = 70; // FAA passing mark is 70%
  const currentRatePercent = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;
  const isPassed = currentRatePercent >= passRate;

  return (
    <div id="exam-engine-root" className="space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-white/5 pb-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="space-y-3.5">
          <h2 className="text-xl font-display font-black tracking-widest text-white flex items-center gap-2.5">
            ✏️ FAA PART 107 COMMAND CERTIFICATION EXAM
          </h2>
          
          {/* Exam Mode Segment Controls */}
          <div className="flex bg-zinc-950 border border-white/5 p-1 rounded-xl max-w-md shadow-inner select-none flex-wrap sm:flex-nowrap">
            <button
              onClick={() => {
                if (examMode !== "full") onChangeMode("full");
              }}
              className={`flex-1 text-center px-3.5 py-2 text-[10px] font-mono font-bold uppercase rounded-lg transition-all cursor-pointer ${
                examMode === "full" 
                  ? "bg-cyan-500 text-zinc-950 shadow-md font-black" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
              }`}
            >
              Full FAA (45 Qs)
            </button>
            <button
              onClick={() => {
                if (examMode !== "quick") onChangeMode("quick");
              }}
              className={`flex-1 text-center px-3.5 py-2 text-[10px] font-mono font-bold uppercase rounded-lg transition-all cursor-pointer ${
                examMode === "quick" 
                  ? "bg-cyan-500 text-zinc-950 shadow-md font-black" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
              }`}
            >
              Quick (15 Qs)
            </button>
            <button
              onClick={() => {
                if (examMode !== "drill") onChangeMode("drill");
              }}
              className={`flex-1 text-center px-3.5 py-2 text-[10px] font-mono font-bold uppercase rounded-lg transition-all cursor-pointer ${
                examMode === "drill" 
                  ? "bg-cyan-500 text-zinc-950 shadow-md font-black" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
              }`}
            >
              Weak Drill
            </button>
          </div>

          <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest leading-relaxed">
            {examMode === "full" && "Comprehensive simulation consisting of all 45 FAA airspace and regulatory questions."}
            {examMode === "quick" && "Accelerated practice mode with an equal category-balanced subset of 15 questions."}
            {examMode === "drill" && "Targeted review focusing on questions requiring attention or previously missed."}
          </p>
        </div>

        {/* Dynamic Running Score HUD */}
        <div className="flex gap-2.5 text-xs font-mono select-none">
          <div className="bg-zinc-950/80 border border-white/5 rounded-xl px-3.5 py-2 text-center shrink-0 min-w-[75px] shadow-inner">
            <div className="text-[8.5px] text-zinc-500 uppercase tracking-widest font-black leading-none mb-1">Answered</div>
            <div className="text-white font-extrabold">{Object.keys(completedQuestions).length} / {totalQuestions}</div>
          </div>
          <div className="bg-zinc-950/80 border border-white/5 rounded-xl px-3.5 py-2 text-center shrink-0 min-w-[75px] shadow-inner">
            <div className="text-[8.5px] text-emerald-400 uppercase tracking-widest font-black leading-none mb-1">Correct</div>
            <div className="text-emerald-400 font-extrabold cyber-glow-emerald">{correctAnswersCount}</div>
          </div>
          <div className="bg-zinc-950/80 border border-white/5 rounded-xl px-3.5 py-2 text-center shrink-0 min-w-[75px] shadow-inner">
            <div className="text-[8.5px] text-red-400 uppercase tracking-widest font-black leading-none mb-1">Incorrect</div>
            <div className="text-red-400 font-extrabold">{incorrectAnswersCount}</div>
          </div>
        </div>
      </div>

      {examFinished ? (
        /* Exam Finished Summary Showcase Card */
        <div className="hud-card rounded-2xl p-8 max-w-2xl mx-auto space-y-6 text-center relative overflow-hidden scanline">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
          
          <div className="space-y-3.5">
            <Award className={`h-16 w-16 mx-auto ${isPassed ? "text-cyan-400 animate-bounce cyber-glow-cyan" : "text-amber-500 animate-pulse"}`} />
            <h3 className="text-2xl font-display font-black tracking-widest text-white uppercase">
              {isPassed ? "PROVISIONAL REMOTE PILOT GRANTED" : "KNOWLEDGE MARKS INSUFFICIENT"}
            </h3>
            <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">Aeronautical Command Testing Standards (ALC-107)</p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-5 border-y border-white/5 text-xs font-mono max-w-md mx-auto bg-zinc-950/50 rounded-xl px-4">
            <div>
              <div className="text-2xl font-extrabold text-white">{currentRatePercent}%</div>
              <div className="text-[8.5px] text-zinc-500 uppercase tracking-wider block mt-1">Grade (Pass: {passRate}%)</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400 cyber-glow-emerald">{correctAnswersCount}</div>
              <div className="text-[8.5px] text-zinc-500 uppercase tracking-wider block mt-1">Correct Exercises</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-red-400">{incorrectAnswersCount}</div>
              <div className="text-[8.5px] text-zinc-500 uppercase tracking-wider block mt-1">Incorrect Exercises</div>
            </div>
          </div>

          {/* Certificate Generation */}
          {isPassed && (
            <div className="p-5 bg-zinc-950/90 border border-white/10 rounded-2xl max-w-md mx-auto text-left flex gap-4 items-center shadow-2xl relative overflow-hidden">
              <div className="absolute -right-3 -bottom-3 opacity-5 text-gray-400 pointer-events-none select-none font-display font-black text-6xl">FAA</div>
              <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.15)] font-display font-extrabold">
                ✓
              </div>
              <div className="text-xs font-mono">
                <span className="text-[8.5px] text-cyan-400 font-extrabold block uppercase tracking-widest cyber-glow-cyan">SECURE DIGITAL FAA LICENSING SYSTEM</span>
                <span className="text-zinc-100 font-bold block text-[11.5px] mt-0.5">PILOT DESIGNATION: COMMERCIAL sUAS COMMANDER</span>
                <span className="text-[9.5px] text-zinc-500 block mt-1 uppercase tracking-wider">Authorization Code: ALC-{Math.floor(100000 + Math.random() * 900000)} • Validity: 24 Months</span>
              </div>
            </div>
          )}

          <div className="text-zinc-400 text-xs leading-relaxed max-w-md mx-auto font-sans font-medium">
            {isPassed ? (
              <span className="text-emerald-400">Excellent flight compliance competency demonstrated! You are fully prepared to take the physical proctored airman standard test at an FAA testing center.</span>
            ) : (
              <span className="text-amber-500">Your study score falls below the required 70% threshold. Analyze your weak area categories in the analytics panel, review study intelligence concepts, and re-run this attempt.</span>
            )}
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onRestartExam}
              className="px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-zinc-950 font-sans font-black rounded-xl text-xs transition-all flex items-center gap-1.5 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer hover:scale-105"
            >
              <RotateCcw className="h-4 w-4 text-zinc-950" /> Restart FAA Exam
            </button>
          </div>
        </div>
      ) : (
        /* Active Quiz Sandbox Component */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Area */}
          <div className="lg:col-span-8 hud-card rounded-2xl p-6 space-y-6">
            {/* Question Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <div className="text-cyan-400 text-[10.5px] font-mono uppercase tracking-widest font-extrabold cyber-glow-cyan">Domain: {currentQuestion.category}</div>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-white/5 px-3 py-1.5 rounded-lg">
                Ref: Part 107.51
              </span>
            </div>

            {/* Question Paragraph */}
            <h3 className="font-display font-black text-white text-base leading-snug tracking-wide">
              {currentQuestion.question}
            </h3>

            {/* Answer Options Stack */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const answerLetter = idx === 0 ? "A" : idx === 1 ? "B" : "C";

                return (
                  <button
                    key={idx}
                    disabled={hasAnsweredCurrent}
                    onClick={() => onSelectAnswer(idx)}
                    className={`w-full p-4.5 border rounded-2xl text-left text-xs font-mono flex gap-3.5 items-center leading-relaxed transition-all ${getOptionClasses(idx)}`}
                  >
                    <span className="h-7 w-7 font-display font-black shrink-0 flex items-center justify-center rounded-xl bg-zinc-950/80 border border-white/5 uppercase select-none text-zinc-450">
                      {answerLetter}
                    </span>
                    <span className="font-sans font-bold leading-normal">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Explanation Reveal */}
            {hasAnsweredCurrent && currentQuestion && (
              <div className="p-5 bg-zinc-950/70 border border-white/5 rounded-2xl space-y-4 text-xs font-mono shadow-inner">
                {/* Header with Reference */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[9.5px] text-zinc-400">
                    <HelpCircle className="h-4 w-4 text-cyan-400" />
                    FAA Technical Explanation
                  </div>
                  {currentQuestion.reference && (
                    <span className="text-[10px] text-cyan-400/85 bg-cyan-950/50 border border-cyan-500/20 px-2.5 py-1 rounded-md font-extrabold uppercase tracking-widest">
                      Doc Ref: {currentQuestion.reference}
                    </span>
                  )}
                </div>

                {/* Explanation text */}
                <p className="text-zinc-350 leading-relaxed font-sans text-xs">{currentQuestion.explanation}</p>

                {/* Why Wrong Answers Are Wrong */}
                {currentQuestion.whyWrong && currentQuestion.whyWrong.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-white/5">
                    <span className="text-[9.5px] text-zinc-500 font-black uppercase tracking-widest block font-mono">Why alternate choices are incorrect:</span>
                    <ul className="space-y-1.5 list-none">
                      {currentQuestion.whyWrong.map((reason: string, rIdx: number) => {
                        // In case of multiple options, we can render. If length doesn't match total options, that's fine.
                        return (
                          <li key={rIdx} className="flex gap-2 text-red-400/80 font-sans text-xs items-start leading-relaxed">
                            <span className="text-red-500 font-extrabold text-mono shrink-0 select-none">✕</span>
                            <span>{reason}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Sub-cards: Memory Lock & Operational Meaning */}
                {(currentQuestion.memoryLock || currentQuestion.operationalMeaning) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-white/5">
                    {currentQuestion.memoryLock && (
                      <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl space-y-1">
                        <span className="text-[9.5px] text-cyan-400 font-extrabold block uppercase tracking-widest font-mono">🧠 Memory Lock:</span>
                        <p className="text-zinc-300 font-sans font-bold leading-normal text-xs">{currentQuestion.memoryLock}</p>
                      </div>
                    )}
                    {currentQuestion.operationalMeaning && (
                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1">
                        <span className="text-[9.5px] text-emerald-400 font-extrabold block uppercase tracking-widest font-mono">⚡ Operational Meaning:</span>
                        <p className="text-zinc-300 font-sans leading-normal text-xs font-medium">{currentQuestion.operationalMeaning}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Exam Relevance */}
                {currentQuestion.examRelevance && (
                  <div className="text-[9.5px] text-zinc-500 border-t border-white/5 pt-2 font-mono flex flex-col gap-1 uppercase tracking-wider">
                    <span className="text-cyan-400/80 font-black">Aeronautical testing supplement check:</span>
                    <p className="font-sans text-zinc-400 font-medium leading-relaxed normal-case tracking-normal">{currentQuestion.examRelevance}</p>
                  </div>
                )}
              </div>
            )}

            {/* Control Buttons Footer */}
            <div className="flex justify-between items-center border-t border-white/5 pt-5 flex-wrap gap-4">
              <div className="flex gap-2">
                <button
                  onClick={onPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="p-3 border border-white/5 rounded-xl bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={onNextQuestion}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  className="p-3 border border-white/5 rounded-xl bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="flex gap-2 text-xs font-sans font-bold">
                {!hasAnsweredCurrent ? (
                  <button
                    onClick={onSubmitQuestion}
                    disabled={selectedAnswer === null}
                    className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-zinc-950 font-black tracking-widest transition-all uppercase disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:scale-95 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  >
                    Lock Answer Choice
                  </button>
                ) : (
                  currentQuestionIndex === totalQuestions - 1 ? (
                    <button
                      onClick={onFinishExam}
                      className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-zinc-950 font-black tracking-widest transition-all uppercase cursor-pointer hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    >
                      Finish and Generate Results
                    </button>
                  ) : (
                    <button
                      onClick={onNextQuestion}
                      className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white font-mono tracking-wider font-extrabold transition-all uppercase cursor-pointer"
                    >
                      Move to next question
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Quick-Jump Right Column Palette */}
          <div className="lg:col-span-4 space-y-4">
            <div className="hud-card rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-350 border-b border-white/5 pb-3">
                Aeronautical Pilot Exam Palette
              </h4>

              <div className="grid grid-cols-5 gap-2 select-none font-mono text-xs">
                {Array.from({ length: totalQuestions }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onJumpToQuestion(idx)}
                    className={`h-9 border rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer ${getQuestionStatusMarker(idx)}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-mono text-zinc-500 space-y-2 pt-3 border-t border-white/5 uppercase tracking-wider font-bold">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 block" />
                  <span>Answer Logged</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 border border-white bg-zinc-100 block rounded-full animate-ping" />
                  <span>Active Position</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-zinc-950 border border-white/5 block" />
                  <span>Unanswered Exercises</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5">
                <button
                  onClick={onRestartExam}
                  className="w-full text-center text-[10px] text-zinc-500 hover:text-red-400 focus:outline-none uppercase font-mono tracking-widest font-extrabold block cursor-pointer transition-colors"
                >
                  ⚠ Reset Exam History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
