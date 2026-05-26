import React, { useState, useEffect } from "react";
import { studyConcepts, examQuestions } from "./data/faaData";

// Views
import CommandCenter from "./components/CommandCenter";
import ResourceCenter from "./components/ResourceCenter";
import StudyIntelligence from "./components/StudyIntelligence";
import AirspaceCommand from "./components/AirspaceCommand";
import ExamEngine from "./components/ExamEngine";
import WeakAreaAnalytics from "./components/WeakAreaAnalytics";
import AITutor from "./components/AITutor";
import DroneShowSystems from "./components/DroneShowSystems";
import ArcticOperations from "./components/ArcticOperations";
import BusinessIntelligence from "./components/BusinessIntelligence";
import AccountSettings from "./components/AccountSettings";

// Providers
import { AuthProvider, useAuth } from "./context/AuthContext";

// Icons
import {
  Shield,
  BookOpen,
  GraduationCap,
  Navigation,
  CheckSquare,
  BarChart2,
  Cpu,
  Sparkles,
  Plane,
  Calculator,
  User,
  HeartPulse,
  Settings2
} from "lucide-react";

type Tab =
  | "command"
  | "resources"
  | "study"
  | "airspace"
  | "exam"
  | "analytics"
  | "tutor"
  | "swarm"
  | "arctic"
  | "business"
  | "account";

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { userProfile, userProgress, saveProgress } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("command");


  // Study states
  const [studyProgress, setStudyProgress] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    studyConcepts.forEach(c => {
      initial[c.id] = c.mastered;
    });
    return initial;
  });

  const [studyConfidence, setStudyConfidence] = useState<Record<string, "Low" | "Medium" | "High">>(() => {
    const initial: Record<string, "Low" | "Medium" | "High"> = {};
    studyConcepts.forEach(c => {
      initial[c.id] = c.confidence;
    });
    return initial;
  });

  const [studyNotes, setStudyNotes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    studyConcepts.forEach(c => {
      initial[c.id] = c.notes || "";
    });
    return initial;
  });

  // Exam States
  const [examMode, setExamMode] = useState<"full" | "quick" | "drill">("full");
  const [activeQuestions, setActiveQuestions] = useState<any[]>(examQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [examFinished, setExamFinished] = useState(false);

  // Synchronous hydration block mapping userProgress down to states
  useEffect(() => {
    if (userProgress) {
      if (userProgress.studyProgress && Object.keys(userProgress.studyProgress).length > 0) {
        setStudyProgress(prev => ({ ...prev, ...userProgress.studyProgress }));
      } else {
        // Reset to initial if state is complete empty
        const initial: Record<string, boolean> = {};
        studyConcepts.forEach(c => { initial[c.id] = c.mastered; });
        setStudyProgress(initial);
      }
      
      if (userProgress.studyConfidence && Object.keys(userProgress.studyConfidence).length > 0) {
        setStudyConfidence(prev => ({ ...prev, ...userProgress.studyConfidence }));
      } else {
        const initial: Record<string, "Low" | "Medium" | "High"> = {};
        studyConcepts.forEach(c => { initial[c.id] = c.confidence; });
        setStudyConfidence(initial);
      }

      if (userProgress.studyNotes && Object.keys(userProgress.studyNotes).length > 0) {
        setStudyNotes(prev => ({ ...prev, ...userProgress.studyNotes }));
      } else {
        const initial: Record<string, string> = {};
        studyConcepts.forEach(c => { initial[c.id] = c.notes || ""; });
        setStudyNotes(initial);
      }

      // Load full exam state persistently only if user is on full exam mode
      if (examMode === "full") {
        if (userProgress.completedQuestions) {
          setCompletedQuestions(userProgress.completedQuestions);
          // Force finish flag if completed questions has answering indexes
          if (Object.keys(userProgress.completedQuestions).length === examQuestions.length) {
            setExamFinished(true);
          }
        } else {
          setCompletedQuestions({});
          setExamFinished(false);
        }
      }
    }
  }, [userProgress, examMode]);

  // Derived exam metrics
  let correctAnswersCount = 0;
  let incorrectAnswersCount = 0;
  
  Object.keys(completedQuestions).forEach(id => {
    const q = examQuestions.find(it => it.id === id);
    if (q) {
      if (completedQuestions[id] === q.correctIndex) {
        correctAnswersCount++;
      } else {
        incorrectAnswersCount++;
      }
    }
  });

  // Calculate dynamic unified dispatch readiness score
  const totalConcepts = studyConcepts.length;
  const masteredConceptsCount = Object.values(studyProgress).filter(Boolean).length;
  const studyCompPercentage = (masteredConceptsCount / totalConcepts) * 100;

  const totalQuestions = examQuestions.length;
  const answeredCount = Object.keys(completedQuestions).length;
  const examAccuracyPercentage = answeredCount > 0 ? (correctAnswersCount / answeredCount) * 100 : 0;

  // Global readiness math equation - must always be based on the full 45 questions
  // Find completed answers under standard persistent history (which are full exam answers)
  let persistentCorrect = 0;
  let persistentAnswered = 0;
  if (userProgress && userProgress.completedQuestions) {
    persistentAnswered = Object.keys(userProgress.completedQuestions).length;
    Object.keys(userProgress.completedQuestions).forEach(id => {
      const q = examQuestions.find(it => it.id === id);
      if (q && userProgress.completedQuestions[id] === q.correctIndex) {
        persistentCorrect++;
      }
    });
  }

  const examWeight = persistentAnswered > 0 ? (persistentCorrect / persistentAnswered) * 50 : 0;
  const studyWeight = (masteredConceptsCount / totalConcepts) * 30;
  const highConfidenceCount = Object.values(studyConfidence).filter(lvl => lvl === "High").length;
  const confidenceWeight = (highConfidenceCount / totalConcepts) * 20;
  
  const globalReadinessPercentage = Math.round(Math.min(100, Math.max(10, examWeight + studyWeight + confidenceWeight)));

  // Exam handler callbacks
  const handleSelectAnswer = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // If next question has already been answered, do not reset selectedAnswer
      const nextQuestionId = activeQuestions[currentQuestionIndex + 1].id;
      if (nextQuestionId in completedQuestions) {
        setSelectedAnswer(completedQuestions[nextQuestionId]);
      } else {
        setSelectedAnswer(null);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevQuestionId = activeQuestions[currentQuestionIndex - 1].id;
      if (prevQuestionId in completedQuestions) {
        setSelectedAnswer(completedQuestions[prevQuestionId]);
      } else {
        setSelectedAnswer(null);
      }
    }
  };

  const startExamMode = (mode: "full" | "quick" | "drill") => {
    setExamMode(mode);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setExamFinished(false);
    
    let selectedQs: any[] = [];
    if (mode === "full") {
      selectedQs = examQuestions;
      setActiveQuestions(selectedQs);
      // Hydrate if previous persistent history is active
      if (userProgress && userProgress.completedQuestions) {
        setCompletedQuestions(userProgress.completedQuestions);
        if (Object.keys(userProgress.completedQuestions).length === examQuestions.length) {
          setExamFinished(true);
        }
      } else {
        setCompletedQuestions({});
      }
    } else if (mode === "quick") {
      // Balanced subset: grab 3 from each category to make a perfect 15-question Practice
      const categories = ["Regulations", "Airspace", "Weather", "Operations", "Human Factors"] as const;
      let selection: any[] = [];
      categories.forEach(cat => {
        const catQs = examQuestions.filter(q => q.category === cat);
        selection = [...selection, ...catQs.slice(0, 3)];
      });
      selectedQs = selection;
      setActiveQuestions(selectedQs);
      setCompletedQuestions({});
    } else {
      // Weak Area Drill: find previously missed questions from full progress
      const incorrectIds: string[] = [];
      if (userProgress && userProgress.completedQuestions) {
        Object.keys(userProgress.completedQuestions).forEach(id => {
          const q = examQuestions.find(it => it.id === id);
          if (q && userProgress.completedQuestions[id] !== q.correctIndex) {
            incorrectIds.push(id);
          }
        });
      }
      
      let selection = examQuestions.filter(q => incorrectIds.includes(q.id));
      // Fallback filler to 10 questions to ensure drill is fully functional
      if (selection.length < 10) {
        const remaining = examQuestions.filter(q => !selection.find(s => s.id === q.id));
        selection = [...selection, ...remaining.slice(0, 10 - selection.length)];
      }
      selectedQs = selection;
      setActiveQuestions(selectedQs);
      setCompletedQuestions({});
    }
  };

  const handleSubmitQuestion = () => {
    const currentQuestion = activeQuestions[currentQuestionIndex];
    if (selectedAnswer !== null && !(currentQuestion.id in completedQuestions)) {
      const nextCompleted = {
        ...completedQuestions,
        [currentQuestion.id]: selectedAnswer
      };
      setCompletedQuestions(nextCompleted);
      
      if (examMode === "full") {
        saveProgress({ completedQuestions: nextCompleted });
      }
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setCurrentQuestionIndex(idx);
    const targetQuestionId = activeQuestions[idx].id;
    if (targetQuestionId in completedQuestions) {
      setSelectedAnswer(completedQuestions[targetQuestionId]);
    } else {
      setSelectedAnswer(null);
    }
  };

  const handleRestartExam = () => {
    setCurrentQuestionIndex(0);
    setCompletedQuestions({});
    setSelectedAnswer(null);
    setExamFinished(false);
    
    if (examMode === "full") {
      saveProgress({ completedQuestions: {} });
    }
  };

  const handleFinishExam = () => {
    setExamFinished(true);
    const accuracy = Math.round((correctAnswersCount / activeQuestions.length) * 100);
    const newAttempt = { score: accuracy, date: new Date().toLocaleDateString() };
    
    if (examMode === "full") {
      const nextAttempts = [...(userProgress.examAttempts || []), newAttempt];
      saveProgress({ examAttempts: nextAttempts });
    }
  };

  // Study handler callbacks
  const handleToggleMastery = (id: string) => {
    const nextVal = !studyProgress[id];
    const nextProg = {
      ...studyProgress,
      [id]: nextVal
    };
    setStudyProgress(nextProg);
    saveProgress({ studyProgress: nextProg });
  };

  const handleUpdateConfidence = (id: string, level: "Low" | "Medium" | "High") => {
    const nextConf = {
      ...studyConfidence,
      [id]: level
    };
    setStudyConfidence(nextConf);
    saveProgress({ studyConfidence: nextConf });
  };

  const handleSaveNotes = (id: string, notes: string) => {
    const nextNotes = {
      ...studyNotes,
      [id]: notes
    };
    setStudyNotes(nextNotes);
    saveProgress({ studyNotes: nextNotes });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row font-sans cyber-grid relative overflow-hidden">
      
      {/* Background soft glowing elements for immersive layout */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-[180px] pointer-events-none" />

      {/* Sidebar Navigation Panel / Tactical Shell */}
      <aside className="w-full md:w-68 bg-zinc-950/80 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/5 flex flex-col pt-6 pb-5 shrink-0 select-none relative z-10">
        
        {/* Brand Banner */}
        <div className="px-6 pb-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-black font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="text-base font-display tracking-tight text-white cyber-glow-cyan">HQ</span>
            </div>
            <div>
              <h1 className="font-display font-extrabold text-sm text-zinc-50 uppercase tracking-widest leading-none">
                Drone Operations
              </h1>
              <span className="text-[9px] text-cyan-400 font-mono tracking-widest block mt-1 uppercase font-bold cyber-glow-cyan animate-pulse">Tactical HUD Command</span>
            </div>
          </div>
        </div>

        {/* Dynamic dispatch profile card */}
        <div className="p-4 mx-4 mt-5 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-xl space-y-2.5 relative overflow-hidden scanline">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 overflow-hidden">
              {userProfile.profilePhoto ? (
                <img 
                  src={userProfile.profilePhoto} 
                  alt="Crew avatar signature" 
                  className="h-full w-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              ) : (
                <User className="h-3.5 w-3.5" />
              )}
            </div>
            <div className="text-[11px] font-mono leading-none flex-1 min-w-0">
              <span className="text-zinc-500 block uppercase text-[8px] font-sans font-bold tracking-wider">Crew Designation</span>
              <span className="text-zinc-200 font-bold block pt-0.5 truncate text-[11px]">
                {userProfile.displayName || "Your Progress"}
              </span>
            </div>
          </div>
          <div className="border-t border-white/5 pt-2 flex justify-between text-[11px] font-mono">
            <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider">HQ Readiness</span>
            <span className={`font-bold tracking-wider ${globalReadinessPercentage >= 80 ? "text-emerald-400 cyber-glow-emerald" : "text-amber-400"}`}>
              {globalReadinessPercentage}% Rdy
            </span>
          </div>
        </div>

        {/* Tabs Link list */}
        <nav className="flex-1 mt-6 px-3 space-y-1.5 overflow-y-auto">
          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block px-3 pb-1 font-bold">Master Controls</span>
          
          <button
            onClick={() => setActiveTab("command")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "command"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <Shield className={`h-4.5 w-4.5 shrink-0 ${activeTab === "command" ? "text-cyan-400" : "text-zinc-500"}`} /> Command Center
          </button>

          <button
            onClick={() => setActiveTab("resources")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "resources"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <BookOpen className={`h-4.5 w-4.5 shrink-0 ${activeTab === "resources" ? "text-cyan-400" : "text-zinc-500"}`} /> Resource Intel
          </button>

          <button
            onClick={() => setActiveTab("study")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "study"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <GraduationCap className={`h-4.5 w-4.5 shrink-0 ${activeTab === "study" ? "text-cyan-400" : "text-zinc-500"}`} /> Study Academy
          </button>

          <button
            onClick={() => setActiveTab("airspace")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "airspace"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <Navigation className={`h-4.5 w-4.5 shrink-0 ${activeTab === "airspace" ? "text-cyan-400" : "text-zinc-500"}`} /> Airspace Command
          </button>

          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block px-3 pt-5 pb-1 font-bold">Certification Testing</span>
          
          <button
            onClick={() => setActiveTab("exam")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "exam"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <CheckSquare className={`h-4.5 w-4.5 shrink-0 ${activeTab === "exam" ? "text-cyan-400" : "text-zinc-500"}`} /> Practice Exam
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "analytics"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <BarChart2 className={`h-4.5 w-4.5 shrink-0 ${activeTab === "analytics" ? "text-cyan-400" : "text-zinc-500"}`} /> Weak Analytics
          </button>

          <button
            onClick={() => setActiveTab("tutor")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "tutor"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-teal-200 hover:bg-zinc-900/30"
            }`}
          >
            <Sparkles className={`h-4.5 w-4.5 shrink-0 animate-pulse ${activeTab === "tutor" ? "text-cyan-400" : "text-cyan-500"}`} /> AI Ground Tutor
          </button>

          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block px-3 pt-5 pb-1 font-bold">Mission Logistics</span>
          
          <button
            onClick={() => setActiveTab("swarm")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "swarm"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <Cpu className={`h-4.5 w-4.5 shrink-0 ${activeTab === "swarm" ? "text-cyan-400" : "text-zinc-500"}`} /> Drone Show Swarms
          </button>

          <button
            onClick={() => setActiveTab("arctic")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "arctic"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <Plane className={`h-4.5 w-4.5 shrink-0 ${activeTab === "arctic" ? "text-cyan-400" : "text-zinc-500"}`} /> Arctic Ops
          </button>

          <button
            onClick={() => setActiveTab("business")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "business"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <Calculator className={`h-4.5 w-4.5 shrink-0 ${activeTab === "business" ? "text-cyan-400" : "text-zinc-500"}`} /> Fleet Economics
          </button>

          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block px-3 pt-5 pb-1 font-bold">AeroSaaS Platform</span>
          
          <button
            onClick={() => setActiveTab("account")}
            className={`w-full text-left py-2.5 px-3.5 rounded-lg text-xs font-mono transition-all flex items-center gap-3 uppercase tracking-wider font-bold border border-transparent ${
              activeTab === "account"
                ? "bg-cyan-500/10 border-l-3 border-l-cyan-400 border-y-white/5 border-r-white/5 text-cyan-400 shadow-[rgba(6,182,212,0.15)_0px_0px_15px]"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <Settings2 className={`h-4.5 w-4.5 shrink-0 ${activeTab === "account" ? "text-cyan-400" : "text-zinc-500"}`} /> Account Settings
          </button>
        </nav>

        {/* Workspace Footer */}
        <div className="px-6 pt-4 mt-4 border-t border-white/5 text-[9px] text-zinc-600 font-mono text-center leading-normal">
          SECURE FLIGHT CONTEXT PORT: 3000<br />
          VERSION 1.2.0 (STABLE)
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 bg-zinc-950/20 p-4 md:p-8 overflow-y-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Active Router views */}
          {activeTab === "command" && (
            <CommandCenter
              examScore={examAccuracyPercentage}
              readinessPercentage={globalReadinessPercentage}
              completedQuestionsCount={answeredCount}
              masteredConceptsCount={masteredConceptsCount}
            />
          )}

          {activeTab === "resources" && (
            <ResourceCenter />
          )}

          {activeTab === "study" && (
            <StudyIntelligence
              studyProgress={studyProgress}
              studyConfidence={studyConfidence}
              studyNotes={studyNotes}
              onToggleMastery={handleToggleMastery}
              onUpdateConfidence={handleUpdateConfidence}
              onSaveNotes={handleSaveNotes}
            />
          )}

          {activeTab === "airspace" && (
            <AirspaceCommand />
          )}

          {activeTab === "exam" && (
            <ExamEngine
              questions={activeQuestions}
              currentQuestionIndex={currentQuestionIndex}
              completedQuestions={completedQuestions}
              examFinished={examFinished}
              score={correctAnswersCount}
              correctAnswersCount={correctAnswersCount}
              incorrectAnswersCount={incorrectAnswersCount}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              onSubmitQuestion={handleSubmitQuestion}
              onJumpToQuestion={handleJumpToQuestion}
              onRestartExam={handleRestartExam}
              onFinishExam={handleFinishExam}
              examMode={examMode}
              onChangeMode={startExamMode}
            />
          )}

          {activeTab === "analytics" && (
            <WeakAreaAnalytics
              completedQuestions={userProgress.completedQuestions || {}}
              studyProgress={studyProgress}
              studyConfidence={studyConfidence}
            />
          )}

          {activeTab === "tutor" && (
            <AITutor />
          )}

          {activeTab === "swarm" && (
            <DroneShowSystems />
          )}

          {activeTab === "arctic" && (
            <ArcticOperations />
          )}

          {activeTab === "business" && (
            <BusinessIntelligence />
          )}

          {activeTab === "account" && (
            <AccountSettings />
          )}
        </div>
      </main>

    </div>
  );
}
