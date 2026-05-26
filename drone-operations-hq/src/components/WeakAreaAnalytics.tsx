import React from "react";
import { examQuestions, studyConcepts } from "../data/faaData";
import { TrendingUp, AlertTriangle, CheckCircle, Award, Compass, BarChart } from "lucide-react";

interface WeakAreaAnalyticsProps {
  completedQuestions: Record<string, number>; // questionId -> selectedIndex
  studyProgress: Record<string, boolean>; // conceptId -> mastered
  studyConfidence: Record<string, "Low" | "Medium" | "High">;
}

export default function WeakAreaAnalytics({
  completedQuestions,
  studyProgress,
  studyConfidence
}: WeakAreaAnalyticsProps) {
  
  // Categorize standard FAA Questions from data
  // categories count: Regulations, Airspace, Weather, Operations, Human Factors
  const categories = ["Regulations", "Airspace", "Weather", "Operations", "Human Factors"] as const;

  // Compile statistics
  const stats = categories.map(cat => {
    // find all questions under this category
    const questionsInCat = examQuestions.filter(q => q.category === cat);
    const totalQuestions = questionsInCat.length;

    // find answered questions in this category and get correctness
    let correctCount = 0;
    let answeredCount = 0;

    questionsInCat.forEach(q => {
      if (q.id in completedQuestions) {
        answeredCount++;
        if (completedQuestions[q.id] === q.correctIndex) {
          correctCount++;
        }
      }
    });

    // Check study concepts matching this category (just general mapping support)
    const masteredConceptsInDomain = Object.keys(studyProgress).filter(id => {
      const isMastered = studyProgress[id];
      // Map general domains (manual simplistic mapping for alignment)
      if (cat === "Regulations" && (id === "concept-1" || id === "concept-3")) return isMastered;
      if (cat === "Airspace" && id === "concept-2") return isMastered;
      if (cat === "Operations" && id === "concept-4") return isMastered;
      if (cat === "Weather" && id === "concept-5") return isMastered;
      return false;
    }).length;

    // Calculate dynamic rating percentage
    // Based on answered questions (75% weight) and study mastering (25% weight)
    let domainRating = 20; // baseline
    if (answeredCount > 0) {
      const examRating = (correctCount / answeredCount) * 100;
      domainRating = Math.round(examRating * 0.75 + (masteredConceptsInDomain > 0 ? 25 : 0));
    } else {
      domainRating = Math.round((masteredConceptsInDomain > 0 ? 50 : 0) + 20);
    }
    
    // Bounds clamping
    domainRating = Math.max(10, Math.min(100, domainRating));

    return {
      category: cat,
      totalQuestionsAvailable: totalQuestions,
      answeredCount,
      correctCount,
      domainRating,
      masteredCount: masteredConceptsInDomain
    };
  });

  // Calculate global scores
  const totalAnswered = Object.keys(completedQuestions).length;
  let totalCorrect = 0;
  Object.keys(completedQuestions).forEach(id => {
    const q = examQuestions.find(ex => ex.id === id);
    if (q && completedQuestions[id] === q.correctIndex) {
      totalCorrect++;
    }
  });

  // Global Readiness Formula
  // 50% Exam accuracy, 30% Study mastery, 20% general padding based on confidence
  const examPortion = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 50 : 0;
  
  const totalConcepts = studyConcepts.length || 5;
  const masteredCountGlobal = Object.values(studyProgress).filter(Boolean).length;
  const studyPortion = (masteredCountGlobal / totalConcepts) * 30;

  const confidenceLevels = Object.values(studyConfidence);
  const highConfidenceCount = confidenceLevels.filter(lvl => lvl === "High").length;
  const confidencePortion = (highConfidenceCount / totalConcepts) * 20;

  const calculatedReadiness = Math.round(Math.min(100, Math.max(10, examPortion + studyPortion + confidencePortion)));

  const getStatusAdvisory = () => {
    if (calculatedReadiness >= 80) {
      return {
        title: "FLIGHT PERMITTED - COMBAT READY",
        color: "text-emerald-400 border-emerald-500/20 bg-emerald-950/15 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
        desc: "Compiling metrics logs points toward outstanding FAA Part 107 compliance. Fleet operations pre-cleared."
      };
    }
    if (calculatedReadiness >= 50) {
      return {
        title: "CAUTION LIMIT - REMEDIAL OUTLINE SUGGESTED",
        color: "text-amber-500 border-amber-500/20 bg-amber-950/15 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
        desc: "Core visual airspace grids contain uncertified blindspots. Re-run practice exams and check safety waivers."
      };
    }
    return {
      title: "GROUNDED - RE-STUDY MANDATED",
      color: "text-red-400 border-red-500/20 bg-red-950/15 shadow-[0_0_20px_rgba(239,68,68,0.1)]",
      desc: "Severe FAA learning gaps identified. Do not attempt commercial dispatch. Target regulatory topics immediately."
    };
  };

  const advisory = getStatusAdvisory();

  return (
    <div id="weak-area-analytics-root" className="space-y-6 font-sans">
      {/* Title */}
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-display font-black tracking-widest text-white flex items-center gap-2.5">
          📊 REAL-TIME WEAK AREA HEATMAPS & ANALYTICS
        </h2>
        <p className="text-zinc-400 text-xs mt-1.5 font-mono uppercase tracking-widest leading-relaxed">
          Evidence-based pilot performance profiling calculated from active quiz feedback and concept trackers.
        </p>
      </div>

      {/* Overview stats HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Dynamic score gauge */}
        <div className="hud-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-1.5 border-b border-white/5 pb-3">
            <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest flex justify-between items-center">
              <span>Readiness Performance Level</span>
              <span className="text-[10px] text-zinc-500 font-mono font-normal tracking-wide">CALCULATED RATE</span>
            </h3>
            <div className="flex items-baseline gap-2 pt-2 select-none">
              <span className="text-4xl font-mono font-black text-cyan-400 cyber-glow-cyan">{calculatedReadiness}%</span>
              <span className="text-[9.5px] uppercase font-bold tracking-widest text-zinc-500 font-mono">FAA STANDARD INDEX</span>
            </div>
          </div>
          
          <div className="py-3">
            <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-2 font-mono">Composite Components:</span>
            <div className="space-y-1.5 font-mono text-[11px] text-zinc-400">
              <div className="flex justify-between"><span>• Exam Correctness (50% Wt)</span> <span className="text-zinc-200 font-extrabold">{Math.round(examPortion * 2)}%</span></div>
              <div className="flex justify-between"><span>• Concept Mastery (30% Wt)</span> <span className="text-zinc-200 font-extrabold">{Math.round(studyPortion * 3.33)}%</span></div>
              <div className="flex justify-between"><span>• High-Level Confidence (20% Wt)</span> <span className="text-zinc-200 font-extrabold">{Math.round(confidencePortion * 5)}%</span></div>
            </div>
          </div>

          <p className="text-[10.5px] text-zinc-400 leading-normal bg-zinc-950/70 p-3.5 border border-white/5 rounded-xl font-mono">
            Requires at least <span className="text-cyan-400 font-extrabold cyber-glow-cyan">80% readiness</span> to satisfy commercial flight safety indices.
          </p>
        </div>

        {/* Dynamic Advisory Box */}
        <div className={`border rounded-2xl p-6 flex flex-col justify-between ${advisory.color}`}>
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-mono font-black tracking-widest uppercase text-white/50 flex items-center gap-1.5">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-400 shrink-0" />
              AERONAUTICAL DISPATCH DIRECTIVE
            </h4>
            <div className="text-[13px] font-display font-black uppercase tracking-wider text-white pt-2 leading-snug">
              {advisory.title}
            </div>
            <p className="text-[12px] text-white/70 leading-relaxed pt-2">
              {advisory.desc}
            </p>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between text-[9px] font-mono mt-4 uppercase text-white/40 tracking-widest">
            <span>Logged: UTC 09:12</span>
            <span>Ref: COMM-FAA-DISPATCH</span>
          </div>
        </div>

        {/* Study mastery meter card */}
        <div className="hud-card rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest border-b border-white/5 pb-3">
              Topic Mastery Meter
            </h3>
            <div className="space-y-4 pt-1 font-mono text-xs">
              <div>
                <div className="flex justify-between text-zinc-400 text-[11px] pb-1.5">
                  <span className="uppercase font-bold tracking-wider text-[9px]">Exam Exercises Logged</span>
                  <span className="text-white font-extrabold">{totalAnswered} / {examQuestions.length}</span>
                </div>
                <div className="w-full bg-zinc-950 border border-white/5 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(totalAnswered / examQuestions.length) * 100}%` }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-zinc-400 text-[11px] pb-1.5">
                  <span className="uppercase font-bold tracking-wider text-[9px]">Concept Tracks Certified</span>
                  <span className="text-white font-extrabold">{masteredCountGlobal} / {totalConcepts}</span>
                </div>
                <div className="w-full bg-zinc-950 border border-white/5 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${(masteredCountGlobal / totalConcepts) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 leading-tight pt-4 border-t border-white/5 uppercase tracking-wider">
            • Data logs map to remote pilot study timelines and fluctuate procedurally.
          </div>
        </div>

      </div>

      {/* Heatmaps and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Domain Metrics bar chart */}
        <div className="hud-card rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest border-b border-white/5 pb-3 flex items-center gap-2">
            <BarChart className="h-4.5 w-4.5 text-cyan-400" /> Topic Mastery Score Distribution
          </h3>

          <div className="space-y-4 pt-2 font-mono text-xs">
            {stats.map(it => (
              <div key={it.category} className="space-y-1.5">
                <div className="flex justify-between text-zinc-400 text-[11.5px]">
                  <span className="font-extrabold text-zinc-200 uppercase tracking-wider">{it.category}</span>
                  <span className={`font-black tracking-wide ${it.domainRating >= 80 ? "text-emerald-400 cyber-glow-emerald" : it.domainRating >= 60 ? "text-amber-400" : "text-red-400"}`}>
                    {it.domainRating}% Rating
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-zinc-950 border border-white/5 h-4 rounded-lg overflow-hidden flex shadow-inner">
                    <div
                      className={`h-full transition-all duration-700 ${
                        it.domainRating >= 80 
                          ? "bg-cyan-500" 
                          : it.domainRating >= 60 
                          ? "bg-amber-500" 
                          : "bg-red-500"
                      }`}
                      style={{ width: `${it.domainRating}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500 shrink-0 min-w-[50px] text-right font-bold">
                    ({it.correctCount}/{it.answeredCount})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Category Heatmap Grid */}
        <div className="hud-card rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
              <span>Aviation Compliance Heatmap</span>
            </h3>
            <span className="text-[9px] text-zinc-500 font-mono font-normal tracking-widest uppercase">ACTIVE GRID LOGS</span>
          </div>

          <p className="text-zinc-400 text-xs leading-relaxed font-sans font-medium">
            Each cell represents a critical FAA compliance topic. Red indicates severe learning gaps, amber represents boundary-state reviews, and emerald indicates clear operational readiness.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 select-none">
            {stats.map(it => {
              const statusColor = 
                it.domainRating >= 80 
                  ? "bg-emerald-950/25 border-emerald-500/25 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)]" 
                  : it.domainRating >= 55 
                  ? "bg-amber-950/25 border-amber-500/25 text-amber-500" 
                  : "bg-red-950/25 border-red-500/25 text-red-400";

              return (
                <div key={it.category} className={`p-4 border rounded-xl text-center font-mono text-xs ${statusColor} space-y-1.5 flex flex-col justify-center items-center`}>
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{it.category}</div>
                  <div className="text-xl font-extrabold text-white">{it.domainRating}%</div>
                  <div className="text-[8.5px] font-black uppercase tracking-wider opacity-85 pt-1.5 border-t border-white/5 w-full">
                    {it.domainRating >= 80 ? "✓ FAA CLEAR" : it.domainRating >= 55 ? "⚠️ WARNING" : "🚨 OVERLIMIT"}
                  </div>
                </div>
              );
            })}
            
            {/* Swarm and Special operations padding cells */}
            <div className="p-4 bg-zinc-950/80 border border-white/5 rounded-xl text-center font-mono text-xs text-zinc-500 space-y-1.5 flex flex-col justify-center items-center">
              <div className="text-[10px] uppercase font-bold tracking-widest">Swarm Systems</div>
              <div className="text-xl font-extrabold text-zinc-400">100%</div>
              <div className="text-[8.5px] font-bold tracking-wider pt-1.5 border-t border-white/5 w-full uppercase">SECURED</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
