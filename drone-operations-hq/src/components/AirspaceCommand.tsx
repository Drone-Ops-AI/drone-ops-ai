import React, { useState } from "react";
import { airspaceZones } from "../data/faaData";
import { Navigation, ShieldAlert, CheckCircle2, CloudAlert, Cpu, Layers, HelpCircle, Terminal } from "lucide-react";

export default function AirspaceCommand() {
  const [selectedAirspaceId, setSelectedAirspaceId] = useState<string>("B");
  
  // LAANC Terminal state
  const [laancForm, setLaancForm] = useState({
    airspaceClass: "C",
    radius: "0.5",
    height: "200",
    droneId: "sUAS-Alpha",
    coordinates: "42.3601° N, 71.0589° W"
  });
  const [laancClearance, setLaancClearance] = useState<{
    status: "Approved" | "Rejected" | "Pending" | null;
    clearanceCode: string;
    timestamp: string;
    directives: string[];
  }>({
    status: null,
    clearanceCode: "",
    timestamp: "",
    directives: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedZone = airspaceZones.find(z => z.id === selectedAirspaceId) || airspaceZones[0];

  const handleLaunchLAANC = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const isApproved = parseInt(laancForm.height) <= 400 && laancForm.airspaceClass !== "A";
      const clearanceId = `FAA-AUTH-${Math.floor(100000 + Math.random() * 900000)}`;

      setLaancClearance({
        status: isApproved ? "Approved" : "Rejected",
        clearanceCode: clearanceId,
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        directives: isApproved 
          ? [
              `Maintain vertical limit strictly under ${laancForm.height} ft AGL.`,
              `Keep visual line of sight with ${laancForm.droneId} at all times.`,
              `Coordinate with local tower frequency if mandated by airport grid.`,
              `Accident reporting limits remain active ($500 damage / AIS Level 3).`
            ]
          : [
              `Target height exceeds airspace maximum grid cell limitations.`,
              `Class A airspace operations are entirely prohibited under Part 107.`,
              `Submit a manual safety waiver petition through the FAA DroneZone.`
            ]
      });
      setIsSubmitting(false);
    }, 1200);
  };  return (
    <div id="airspace-command-root" className="space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-display font-black tracking-widest text-white flex items-center gap-2.5">
          🛰️ AIRSPACE INTEL & LAANC INTERCEPT COMMAND
        </h2>
        <p className="text-zinc-400 text-xs mt-1.5 font-mono uppercase tracking-widest leading-relaxed">
          Interactive evaluation of the National Airspace System (NAS) and live LAANC micro-clearances.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Airspace visual selector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="hud-card rounded-2xl p-6 space-y-6">
            <h3 className="text-xs font-bold font-display uppercase tracking-widest border-b border-white/5 pb-3 text-zinc-400">
              National Airspace Classification Map Specifier
            </h3>
            
            {/* Visual Airspace Stack Selector */}
            <div className="grid grid-cols-5 gap-2.5 select-none">
              {airspaceZones.map(zone => {
                const isActive = zone.id === selectedAirspaceId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedAirspaceId(zone.id)}
                    className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border text-center transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      isActive 
                        ? "bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/20 font-black" 
                        : "bg-zinc-950/80 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800 hover:bg-zinc-900/40"
                    }`}
                  >
                    <span className="text-3xl font-display font-extrabold tracking-tight block leading-none">{zone.id}</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest block mt-1.5 font-mono">Class</span>
                  </button>
                );
              })}
            </div>

            {/* Spec Sheets */}
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-950/70 p-4 rounded-xl border border-white/5 space-y-1 shadow-inner">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block">Aeronautical Limits</span>
                  <div className="text-zinc-200 font-bold text-xs">{selectedZone.altitude}</div>
                </div>
                <div className="bg-zinc-950/70 p-4 rounded-xl border border-white/5 space-y-1 shadow-inner">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block">Authorization Protocol</span>
                  <div className="text-cyan-400 font-bold text-xs cyber-glow-cyan">{selectedZone.authorization}</div>
                </div>
              </div>

              <div className="space-y-1.5 bg-zinc-950/40 p-5 border border-white/5 rounded-xl shadow-inner relative overflow-hidden">
                <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block">National Airspace Meaning & Structure</span>
                <p className="text-zinc-200 leading-relaxed text-[11.5px] font-sans pt-1 font-bold">{selectedZone.meaning}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                <div className="space-y-1.5">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block font-mono">Commercial Mission Example</span>
                  <p className="text-zinc-400 leading-relaxed text-xs pt-1">{selectedZone.missionExample}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block font-mono">FAA Engineering Safety Logic</span>
                  <p className="text-zinc-400 leading-relaxed text-xs pt-1">{selectedZone.faaLogic}</p>
                </div>
              </div>

              {/* Memory Lock */}
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-3 text-xs font-mono">
                <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[9px] text-amber-500 uppercase font-black tracking-widest block">Sectional Chart Key Anchor</span>
                  <p className="text-zinc-300 italic font-sans font-bold">"{selectedZone.memoryLock}"</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Live LAANC Terminal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="hud-card rounded-2xl p-6 relative overflow-hidden">
            <h3 className="text-xs font-bold font-display uppercase tracking-widest text-zinc-400 border-b border-white/5 pb-3 mb-5 flex justify-between items-center">
              <span>Automatic LAANC Clearance Terminal</span>
              <Terminal className="h-4.5 w-4.5 text-zinc-500" />
            </h3>

            <form onSubmit={handleLaunchLAANC} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Target Airspace Class</label>
                  <select
                    value={laancForm.airspaceClass}
                    onChange={(e) => setLaancForm({ ...laancForm, airspaceClass: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="B">Class B (High Risk)</option>
                    <option value="C">Class C</option>
                    <option value="D">Class D</option>
                    <option value="E">Class E (Surface)</option>
                    <option value="G">Class G (Uncontrolled)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Target sUAS Pilot ID</label>
                  <select
                    value={laancForm.droneId}
                    onChange={(e) => setLaancForm({ ...laancForm, droneId: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="sUAS-Alpha">sUAS-Alpha (Heavy)</option>
                    <option value="sUAS-Beta">sUAS-Beta (Swarm)</option>
                    <option value="sUAS-Gamma">sUAS-Gamma (Inspector)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Requested Altitude Limit</label>
                  <select
                    value={laancForm.height}
                    onChange={(e) => setLaancForm({ ...laancForm, height: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="100">100 ft AGL</option>
                    <option value="200">200 ft AGL</option>
                    <option value="350">350 ft AGL</option>
                    <option value="450">450 ft AGL (Exceeds Part 107)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Operating Coordinates</label>
                  <input
                    type="text"
                    value={laancForm.coordinates}
                    onChange={(e) => setLaancForm({ ...laancForm, coordinates: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/5 p-3 rounded-xl text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-zinc-950 font-sans font-black py-3 rounded-xl transition-all text-xs text-center flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <Cpu className="h-4.5 w-4.5 animate-spin" />
                    Transmitting to FAA Servers...
                  </>
                ) : (
                  <>
                    <Layers className="h-4.5 w-4.5" />
                    Submit Automated LAANC Request
                  </>
                )}
              </button>
            </form>

            {/* Simulated LAANC Output Result */}
            {laancClearance.status && (
              <div className={`mt-6 p-5 border rounded-2xl font-mono text-xs space-y-4 transition-all duration-300 relative overflow-hidden shadow-lg ${
                laancClearance.status === "Approved" 
                  ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                  : "bg-red-950/20 border-red-500/20 text-red-300"
              }`}>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-1.5 font-black uppercase tracking-widest text-[11px]">
                    {laancClearance.status === "Approved" ? (
                      <>
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                        LAANC APPROVED
                      </>
                    ) : (
                      <>
                        <CloudAlert className="h-4.5 w-4.5 text-red-400" />
                        LAANC EXCEEDED / DENIED
                      </>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-bold">{laancClearance.timestamp}</div>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div>• Clearance Authenticator: <span className="font-extrabold underline text-zinc-100">{laancClearance.clearanceCode}</span></div>
                  <div>• Target: <span className="text-zinc-100 font-bold">{laancForm.droneId} ({laancForm.height} ft AGL)</span></div>
                  <div>• Sector LatLng: <span className="text-zinc-100 font-bold">{laancForm.coordinates}</span></div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Safety Directives Linked:</div>
                  {laancClearance.directives.map((dir, idx) => (
                    <div key={idx} className="text-[11px] flex gap-2 leading-relaxed text-zinc-300">
                      <span className="text-cyan-400 font-bold select-none">»</span>
                      <span>{dir}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
