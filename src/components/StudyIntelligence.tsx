import React, { useState } from "react";
import { studyConcepts } from "../data/faaData";
import { CheckSquare, Square, ThumbsUp, Medal, FileText, Bookmark, BookOpen } from "lucide-react";

interface StudyIntelligenceProps {
  studyProgress: Record<string, boolean>;
  studyConfidence: Record<string, "Low" | "Medium" | "High">;
  studyNotes: Record<string, string>;
  onToggleMastery: (id: string) => void;
  onUpdateConfidence: (id: string, level: "Low" | "Medium" | "High") => void;
  onSaveNotes: (id: string, notes: string) => void;
}

export default function StudyIntelligence({
  studyProgress,
  studyConfidence,
  studyNotes,
  onToggleMastery,
  onUpdateConfidence,
  onSaveNotes
}: StudyIntelligenceProps) {
  const [activeConceptId, setActiveConceptId] = useState<string>("concept-1");
  const [localNote, setLocalNote] = useState("");

  const activeConcept = studyConcepts.find(c => c.id === activeConceptId) || studyConcepts[0];

  // Sync state when active concept changes
  React.useEffect(() => {
    setLocalNote(studyNotes[activeConceptId] || "");
  }, [activeConceptId, studyNotes]);

  const masteredCount = Object.values(studyProgress).filter(Boolean).length;
  const progressPercent = Math.round((masteredCount / studyConcepts.length) * 100);

  const getConfidenceBadge = (level: "Low" | "Medium" | "High" | undefined) => {
    switch (level) {
      case "High": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default: return "bg-red-500/10 text-red-400 border-red-500/20";
    }
  };

  return (
    <div id="study-intelligence-root" className="space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-black tracking-widest text-white flex items-center gap-2.5">
            🧠 FAA STUDY INTELLIGENCE ENGINE
          </h2>
          <p className="text-zinc-400 text-xs mt-1.5 font-mono uppercase tracking-widest leading-relaxed">
            Structured course review content, confidence logging, and operational memory locks.
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="hud-card rounded-2xl px-5 py-3.5 text-xs font-mono w-full md:w-72 shadow-inner">
          <div className="flex justify-between pb-2 font-bold select-none">
            <span className="text-zinc-500 text-[9px] uppercase tracking-widest">Review Progress:</span>
            <span className="text-cyan-400 cyber-glow-cyan font-bold">{progressPercent}% ({masteredCount}/{studyConcepts.length} Approved)</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <div className="h-full bg-cyan-400 transition-all duration-500 shadow-[0_0_10px_#06b6d4]" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-black block pl-1">
            Part 107 Section Selector:
          </span>
          <div className="space-y-2.5">
            {studyConcepts.map(concept => {
              const isSelected = concept.id === activeConceptId;
              const isMastered = studyProgress[concept.id] || false;
              const confidence = studyConfidence[concept.id] || "Low";

              return (
                <div
                  key={concept.id}
                  onClick={() => setActiveConceptId(concept.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between font-mono text-xs select-none hover:scale-[1.01] ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/25"
                      : "bg-zinc-950/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-start gap-3 truncate">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMastery(concept.id);
                      }}
                      className="mt-0.5 text-zinc-500 hover:text-cyan-400 focus:outline-none transition-colors cursor-pointer"
                    >
                      {isMastered ? (
                        <CheckSquare className="h-4.5 w-4.5 text-cyan-400" />
                      ) : (
                        <Square className="h-4.5 w-4.5 text-zinc-700" />
                      )}
                    </button>
                    <div className="truncate text-left space-y-0.5">
                      <span className="text-[9px] text-zinc-500 uppercase font-bold block leading-none">{concept.section}</span>
                      <span className={`font-sans font-bold text-[13px] block tracking-tight truncate ${isSelected ? "text-white" : "text-zinc-300"}`}>
                        {concept.title}
                      </span>
                    </div>
                  </div>
                  
                  {/* Confidence Badge */}
                  <span className={`text-[8.5px] px-2 py-0.5 uppercase tracking-widest font-black border rounded-full shrink-0 ${getConfidenceBadge(confidence)}`}>
                    {confidence}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Details Canvas */}
        <div className="lg:col-span-8 hud-card rounded-2xl p-6 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-xl pointer-events-none" />

          {/* Title Area */}
          <div className="border-b border-white/5 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[9.5px] font-mono text-cyan-400 uppercase tracking-widest font-black block">{activeConcept.section} Review Outline</span>
              <h3 className="text-xl font-display font-black tracking-wide text-white mt-1">{activeConcept.title}</h3>
            </div>
            <div className="flex gap-2">
              {/* Mastery toggle */}
              <button
                onClick={() => onToggleMastery(activeConcept.id)}
                className={`text-[9.5px] font-mono uppercase tracking-widest font-black px-4 py-2 rounded-xl border inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                  studyProgress[activeConcept.id]
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                    : "bg-zinc-950 text-zinc-500 border-white/5 hover:text-zinc-300 hover:bg-zinc-900/40 cursor-pointer"
                }`}
              >
                <Medal className="h-4 w-4 shrink-0 font-bold" />
                {studyProgress[activeConcept.id] ? "Concept Certified" : "Mark as Mastered"}
              </button>
            </div>
          </div>

          {/* Quick Summary card */}
          <div className="p-4 bg-zinc-950/70 border border-white/5 rounded-xl text-xs font-mono text-zinc-400 leading-relaxed shadow-inner">
            <span className="text-[9px] text-zinc-500 uppercase font-black block mb-1 tracking-widest">Aviation Synopsis:</span>
            <p className="font-sans text-[12px] font-medium leading-relaxed text-zinc-300">{activeConcept.summary}</p>
          </div>

          {/* Bulleted Curriculum Details */}
          <div className="space-y-3">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-black block">
              Core Technical Directives ({activeConcept.details.length}):
            </span>
            <div className="grid grid-cols-1 gap-3">
              {activeConcept.details.map((detail, idx) => (
                <div key={idx} className="flex gap-3 items-start text-xs font-mono text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-white/5 hover:border-cyan-400/15 transition-all">
                  <span className="text-cyan-400 font-bold select-none text-sm leading-none mt-0.5 animate-pulse">»</span>
                  <span className="font-sans font-medium">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Lock Card */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-3 text-xs font-mono shadow-inner">
            <ThumbsUp className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[9.5px] text-amber-500 uppercase font-black tracking-widest block">Tactical Memory Lock</span>
              <p className="text-zinc-200 italic font-sans font-bold">"{activeConcept.memoryLock}"</p>
            </div>
          </div>

          {/* Notes and Confidence Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-white/5">
            {/* Confidence Selection */}
            <div className="space-y-2">
              <label className="text-[9.5px] text-zinc-500 font-mono uppercase tracking-widest font-black block">
                Subject Confidence:
              </label>
              <div className="grid grid-cols-3 gap-1 select-none">
                {(["Low", "Medium", "High"] as const).map(lvl => {
                  const activeLvl = studyConfidence[activeConcept.id] || "Low";
                  return (
                    <button
                      key={lvl}
                      onClick={() => onUpdateConfidence(activeConcept.id, lvl)}
                      className={`text-[9px] font-mono p-2 border uppercase font-black tracking-widest rounded-lg cursor-pointer transition-all ${
                        activeLvl === lvl
                          ? lvl === "High"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : lvl === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-red-500/10 text-red-500 border-red-500/30"
                          : "bg-zinc-950 text-zinc-500 border-white/5 hover:text-zinc-400 hover:bg-zinc-900/40"
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
              <p className="text-[9px] text-zinc-650 font-mono mt-1.5 uppercase tracking-wide">Updates readiness parameters.</p>
            </div>

            {/* Custom Notes */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[9.5px] text-zinc-500 font-mono uppercase tracking-widest font-black flex justify-between">
                <span>Personal Pilot Notes:</span>
                <span className="text-zinc-600 font-normal">SAVES SECURELY</span>
              </label>
              <div className="flex gap-3">
                <textarea
                  value={localNote}
                  onChange={(e) => setLocalNote(e.target.value)}
                  placeholder="Record custom airspace acronyms, testing calculations, or telemetry findings here..."
                  className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-xs text-zinc-350 focus:outline-none focus:border-cyan-500 font-mono h-16 resize-none transition-colors"
                />
                <button
                  onClick={() => {
                    onSaveNotes(activeConcept.id, localNote);
                  }}
                  className="bg-cyan-400 hover:bg-cyan-500 text-zinc-950 px-4 rounded-xl font-mono font-black uppercase text-[10px] tracking-wider flex flex-col justify-center items-center shrink-0 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.15)] active:scale-95"
                >
                  <FileText className="h-4.5 w-4.5" />
                  <span className="text-[9px] mt-0.5">Save</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
