import React, { useState, useRef, useEffect } from "react";
import { Send, Terminal, Loader2, Sparkles, HelpCircle, GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AITutor() {
  const { userProgress, saveProgress } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "### 🎓 Welcome Pilot! I am your FAA Part 107 Operational Learning Specialist.\n\nI can help you pass the remote pilot exam, understand airspace regulations, or answer questions of commercial operations. Ask me anything, or click one of the quick study triggers below!"
    }
  ]);

  useEffect(() => {
    if (userProgress && userProgress.tutorHistory && userProgress.tutorHistory.length > 0) {
      setMessages(userProgress.tutorHistory);
    }
  }, [userProgress]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sampleTriggers = [
    { label: "⚖️ Max sUAS Weight Limit?", text: "What is the absolute maximum weight limit of a small UAS under Part 107?" },
    { label: "🛰️ Airspace Clearance?", text: "Which airspace classifications require prior ATC clearance to operate?" },
    { label: "🚨 Accident Reporting rules?", text: "What is considered a reportable accident and how long do I have to notify the FAA?" },
    { label: "🌪️ Cloud & Sky boundaries?", text: "Describe cloud clearance and visibility constraints for standard drone operations." }
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: Message = { role: "user", text: textToSend };
    const nextMsgsWithUser = [...messages, userMsg];
    setMessages(nextMsgsWithUser);
    saveProgress({ tutorHistory: nextMsgsWithUser });
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: nextMsgsWithUser.slice(1) // exclude initial greeting
        })
      });

      if (!response.ok) {
        throw new Error("Telemetry failure linking with AI Tutor node.");
      }

      const data = await response.json();
      const modelMsg: Message = { role: "model", text: data.text };
      const nextMsgsFinal = [...nextMsgsWithUser, modelMsg];
      setMessages(nextMsgsFinal);
      saveProgress({ tutorHistory: nextMsgsFinal });
    } catch (error: any) {
      console.error(error);
      const errModelMsg: Message = {
        role: "model",
        text: `### ❌ Aeronautical link lost\n\nFailed to establish server API connectivity to Gemini. Returning local simulation backup:\n\nRegarding: "${textToSend}"\n\n*Safety directive*: Under Part 107, keep aircraft under 55 lbs, request airspace clearances via LAANC channels, and report third-party damage > $500 within 10 calendar days. Ensure your workspace GEMINI_API_KEY is configured in Secrets to reactive live conversational training links.`
      };
      const nextMsgsErr = [...nextMsgsWithUser, errModelMsg];
      setMessages(nextMsgsErr);
      saveProgress({ tutorHistory: nextMsgsErr });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-tutor-root" className="space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-white/5 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-black tracking-widest text-white flex items-center gap-2.5">
            🤖 FAA AI OPERATIONAL TUTOR
          </h2>
          <p className="text-zinc-400 text-xs mt-1.5 font-mono uppercase tracking-widest leading-relaxed">
            Conversational tutor proxying to Gemini for elite aeronautical flight coaching.
          </p>
        </div>
        <span className="text-[10px] bg-cyan-400/15 text-cyan-400 border border-cyan-400/20 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 font-bold tracking-wider uppercase cyber-glow-cyan">
          <Sparkles className="h-3.5 w-3.5 inline animate-pulse text-cyan-400" /> Link Live
        </span>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Tutor console */}
        <div className="lg:col-span-8 bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[500px] shadow-2xl relative scanline">
          
          {/* Green Screen Terminal Header */}
          <div className="bg-zinc-950 p-4 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 shadow-inner">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="font-bold tracking-wider text-zinc-400 uppercase">AISTUDIO_FAA_TUTOR_NODE::ON_PORT_3000</span>
            </div>
            <span className="font-bold uppercase tracking-widest text-[9.5px] text-cyan-500 cyber-glow-cyan">LINKED_RATE: FLASH-3.5</span>
          </div>

          {/* Active Chats Canvas */}
          <div className="flex-1 p-5 overflow-y-auto max-h-[380px] space-y-4">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex gap-3.5 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Visual Avatar */}
                <span className={`h-9 w-9 rounded-xl shrink-0 flex items-center justify-center font-display font-extrabold text-[11px] uppercase tracking-wider border ${
                  m.role === "user" 
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.15)]" 
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                }`}>
                  {m.role === "user" ? "CMD" : "FAA"}
                </span>

                {/* Bubble Container */}
                <div className={`p-4 rounded-2xl text-[12.5px] leading-relaxed ${
                  m.role === "user"
                    ? "bg-cyan-950/20 border border-cyan-400/20 text-cyan-100 shadow-[rgba(6,182,212,0.05)_0px_0px_15px]"
                    : "bg-zinc-900/40 border border-white/5 text-zinc-200"
                }`}>
                  {/* Simplistic custom markdown formatter */}
                  <div className="space-y-2 whitespace-pre-wrap font-sans font-medium">
                    {messages && m.text.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith("###")) {
                        return <h4 key={pIdx} className="text-white font-display font-black tracking-widest text-xs uppercase pt-1 inline-block border-b border-white/15 pb-1 mb-1">{para.replace("###", "").trim()}</h4>;
                      }
                      if (para.startsWith("-") || para.startsWith("*")) {
                        return (
                          <ul key={pIdx} className="list-disc pl-5 space-y-1.5 font-mono text-[11.5px] tracking-wide">
                            {para.split("\n").map((li, lIdx) => (
                              <li key={lIdx} className="text-zinc-350">{li.replace(/^[\s-*]+/, "")}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIdx} className="text-zinc-350 leading-relaxed text-[11.5px]">{para}</p>;
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%] items-center mr-auto text-xs font-mono text-zinc-500 pl-11">
                <Loader2 className="h-4.5 w-4.5 animate-spin text-cyan-400" />
                <span className="tracking-widest uppercase text-[10px] font-bold">Querying aviation CFR regulations...</span>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Quick Query Inputs */}
          <div className="p-5 border-t border-white/5 bg-zinc-950/50 space-y-3 shadow-inner">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(input);
                }}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask: 'When do I need to register my drone?' or 'Explain Classes of Airspace'..."
                className="w-full bg-zinc-950/80 border border-white/5 rounded-xl text-xs py-3.5 px-4 text-white focus:outline-none focus:border-cyan-500 font-mono focus:ring-1 focus:ring-cyan-500/20"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="bg-cyan-400 hover:bg-cyan-500 disabled:opacity-30 disabled:pointer-events-none text-zinc-950 text-xs px-5 py-2.5 font-sans font-black uppercase tracking-widest rounded-xl transition-all shrink-0 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer hover:scale-[1.02]"
              >
                <Send className="h-4 w-4 text-zinc-950" /> Send
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar helpchips */}
        <div className="lg:col-span-4 space-y-4">
          <div className="hud-card rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 border-b border-white/5 pb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-cyan-400" /> Ground School Quick Drills
            </h4>
            
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Click any chip below to prompt the FAA Operational Tutor instantly with direct compliance and testing challenges.
            </p>

            <div className="flex flex-col gap-3">
              {sampleTriggers.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleSendMessage(t.text);
                  }}
                  className="text-left p-4 bg-zinc-950/60 border border-white/5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900/40 hover:border-cyan-500/20 group leading-relaxed transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <span className="font-display font-extrabold block text-cyan-400 text-[10.5px] uppercase tracking-wide pb-1 group-hover:cyber-glow-cyan">{t.label}</span>
                  <span className="text-[11px] font-normal italic font-sans text-zinc-400 group-hover:text-zinc-200">"{t.text}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
