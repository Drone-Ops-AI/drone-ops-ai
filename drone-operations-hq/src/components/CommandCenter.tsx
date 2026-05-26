import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Radio, Wind, RefreshCw, AlertTriangle, CloudRain, CheckCircle, Navigation } from "lucide-react";

interface CommandCenterProps {
  examScore: number;
  readinessPercentage: number;
  completedQuestionsCount: number;
  masteredConceptsCount: number;
}

export default function CommandCenter({
  examScore,
  readinessPercentage,
  completedQuestionsCount,
  masteredConceptsCount
}: CommandCenterProps) {
  const [currentTime, setCurrentTime] = useState(new Date().toUTCString());
  const [windSpeed, setWindSpeed] = useState(12); // Speed in Knots
  const [temperature, setTemperature] = useState(15); // Temp in Celsius
  const [gpsCount, setGpsCount] = useState(14);
  const [activeDrones, setActiveDrones] = useState([
    { id: "sUAS-Alpha", model: "Matrice 350 RTK", alt: 220, speed: 18, battery: 74, status: "Normal" },
    { id: "sUAS-Beta", model: "Inspire 3 Swarm-1", alt: 110, speed: 22, battery: 42, status: "Normal" },
    { id: "sUAS-Gamma", model: "Flyability Elios 3", alt: 45, speed: 5, battery: 89, status: "Normal" }
  ]);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "UTC 09:07 - SYSTEM ONLINE: GPS Ground Station Locked",
    "UTC 09:09 - Part 107 Fleet clearance active.",
    "UTC 09:12 - LAANC automated auth received for Sector-4"
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulating small telemetry fluctuations for fidelity
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDrones(prev =>
        prev.map(d => {
          const altChange = Math.floor(Math.random() * 9) - 4;
          const batteryDrop = Math.random() > 0.7 ? 1 : 0;
          return {
            ...d,
            alt: Math.max(10, Math.min(390, d.alt + altChange)),
            battery: Math.max(5, d.battery - batteryDrop)
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (log: string) => {
    setTelemetryLogs(prev => [log, ...prev.slice(0, 4)]);
  };

  const currentLocalTime = new Date();

  // Evaluate Flyability
  const getWeatherStatus = () => {
    if (windSpeed > 25) return { text: "FLIGHT RED ALERT", color: "text-red-500 bg-red-950/40 border-red-905", icon: AlertTriangle, desc: "Sustained high wind conditions. Structural drone control is severely compromised over 25 knots." };
    if (windSpeed > 15) return { text: "FLIGHT ADVISORY CAUTION", color: "text-amber-500 bg-amber-950/40 border-amber-901", icon: AlertTriangle, desc: "Gusts present. Heavy flight load tracking. Ensure advanced preflight engine inspections." };
    return { text: "OPERATIONAL NORMAL", color: "text-blue-500 bg-blue-950/40 border-blue-911", icon: CheckCircle, desc: "Ideal aeronautical flight weather conditions. Part 107 operations pre-cleared." };
  };

  const weatherStatus = getWeatherStatus();

  return (
    <div id="command-center-root" className="space-y-6 font-sans">
      {/* HUD Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-zinc-950/50 backdrop-blur-md border border-white/5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] gap-4 relative overflow-hidden scanline">
        <div className="absolute top-0 left-0 w-2 h-full bg-cyan-400" />
        <div className="flex items-center gap-4 pl-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-black tracking-widest text-white flex items-center gap-2.5">
              DRONE OPERATIONS COMMAND
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mt-1">
              FAA PART 107 COMMERCIAL FLEET HUD • SITE-HQ CONTROL ACTIVE
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
          <div className="bg-zinc-950/80 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
            <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Tactical Time (UTC)</span> 
            <span className="text-cyan-400 font-bold tracking-widest font-mono text-sm">{currentTime.substring(17, 25)}</span>
          </div>
          <div className="bg-zinc-950/80 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
            <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider block mb-0.5">System FTN ID</span> 
            <span className="text-zinc-200 font-bold tracking-widest text-sm uppercase">FTN-93041-A</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Telemetry Gauge & Dynamic Safety Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hud-card rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest mb-5 flex items-center justify-between border-b border-white/5 pb-3">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Weather Telemetry Simulator & Flight Bounds
              </span>
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider">Dynamic Cockpit Metrics</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono pb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Wind className="h-4 w-4 text-cyan-500" /> 
                      Ground Wind Velocity
                    </span>
                    <span className="text-white font-bold text-sm tracking-wider font-mono">{windSpeed} KT</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="40"
                    value={windSpeed}
                    onChange={(e) => {
                      const speed = parseInt(e.target.value);
                      setWindSpeed(speed);
                      addLog(`Ground Wind Speed adjusted to ${speed} KT. Safe bounds recalculated.`);
                    }}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none border border-white/5"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono pt-1.5">
                    <span>3 KT</span>
                    <span className="text-amber-500 font-bold">15 KT (Adv)</span>
                    <span className="text-rose-500 font-bold">25 KT (Limit)</span>
                    <span>40 KT</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono pb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <RefreshCw className="h-4 w-4 text-cyan-500" /> 
                      Surface Temperature
                    </span>
                    <span className="text-white font-bold text-sm tracking-wider font-mono">{temperature}°C ({Math.round(temperature * 1.8 + 32)}°F)</span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="40"
                    value={temperature}
                    onChange={(e) => {
                      const temp = parseInt(e.target.value);
                      setTemperature(temp);
                      addLog(`Dynamic Temp shift: ${temp}°C. Density altitude re-calibrated.`);
                    }}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none border border-white/5"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono pt-1.5">
                    <span className="text-indigo-400 font-bold"> -15°C (Ice Risk)</span>
                    <span>15°C (Standard)</span>
                    <span>40°C</span>
                  </div>
                </div>

                <div className="bg-zinc-950/70 border border-white/5 p-4 rounded-xl flex items-center justify-between text-xs font-mono shadow-inner">
                  <span className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider">Locked GPS Satellites</span>
                  <span className="text-cyan-400 font-extrabold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse shadow-[0_0_8px_#10b981]" />
                    {gpsCount} TRK SATs
                  </span>
                </div>
              </div>

              <div className={`p-5 border rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-300 shadow-md ${weatherStatus.color}`}>
                <div className="flex items-start gap-3">
                  <weatherStatus.icon className="h-6 w-6 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-extrabold text-sm tracking-wider text-white uppercase">{weatherStatus.text}</h4>
                    <p className="text-xs text-white/90 leading-relaxed mt-1.5">{weatherStatus.desc}</p>
                  </div>
                </div>
                <div className="text-[11px] font-mono border-t border-white/10 pt-3 text-white/70 space-y-1.5">
                  <div className="flex justify-between">
                    <span>MAX WING LOAD LIMIT:</span>
                    <span className="font-bold text-white">{windSpeed > 25 ? "EXCEEDED ⚠️" : "NOMINAL ✓"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EST. DENSITY ALTITUDE:</span>
                    <span className="font-bold text-white">{Math.max(100, Math.round(1200 + (temperature - 15) * 120))} ft MSL</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/5 font-sans font-bold">
                    <span>FLIGHT RISK DESCRIPTOR:</span>
                    <span className="underline tracking-wide font-mono text-xs">{windSpeed > 25 ? "NO GO (CANCEL)" : windSpeed > 15 ? "CAUTION STATE" : "APPROVED FLIGHT PATH"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Drone Radar Feed */}
          <div className="hud-card rounded-2xl p-6">
            <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest mb-5 flex items-center justify-between border-b border-white/5 pb-3">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Active UAS Swarm Tactical Radar View
              </span>
              <span className="text-[10px] bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-2.5 py-1 rounded-xl font-mono tracking-wider">
                3 CONTEXT TRACKS FOUND
              </span>
            </h3>

            {/* Radar Screen Visual Grid */}
            <div className="w-full h-48 bg-zinc-950 border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center mb-5 shadow-inner">
              {/* Radar concentric concentric circles */}
              <div className="absolute w-44 h-44 border border-cyan-500/5 rounded-full" />
              <div className="absolute w-28 h-28 border border-cyan-500/5 rounded-full" />
              <div className="absolute w-12 h-12 border border-cyan-500/5 rounded-full" />
              <div className="absolute w-full h-px bg-cyan-500/5" />
              <div className="absolute h-full w-px bg-cyan-500/5" />
              {/* Spinning radar sweeper */}
              <div className="absolute top-0 left-0 w-full h-full border-t border-cyan-400/10 origin-center animate-spin" style={{ animationDuration: '5s' }} />

              {/* Dynamic Target Points */}
              <div className="absolute top-1/4 left-1/3 text-center">
                <span className="relative flex h-2.5 w-2.5 mx-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
                </span>
                <span className="text-[10.5px] font-mono text-cyan-300 block mt-1 font-bold cyber-glow-cyan">sUAS-Alpha</span>
              </div>
              <div className="absolute bottom-1/3 right-1/4 text-center">
                <span className="relative flex h-2.5 w-2.5 mx-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
                </span>
                <span className="text-[10.5px] font-mono text-emerald-300 block mt-1 font-bold cyber-glow-emerald">sUAS-Beta</span>
              </div>
              <div className="absolute top-1/2 right-1/3 text-center">
                <span className="relative flex h-2.5 w-2.5 mx-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
                </span>
                <span className="text-[10.5px] font-mono text-amber-300 block mt-1 font-bold">sUAS-Gamma</span>
              </div>
            </div>

            {/* Drone list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeDrones.map(drone => (
                <div key={drone.id} className="bg-zinc-950/70 border border-white/5 p-4 rounded-xl text-xs font-mono space-y-2 flex flex-col justify-between shadow-inner hover:border-cyan-500/20 transition-all">
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                    <span className="font-black text-zinc-100 flex items-center gap-1.5">
                      <Navigation className="h-3.5 w-3.5 text-cyan-400 rotate-45" /> {drone.id}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      drone.battery > 50 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>{drone.status}</span>
                  </div>
                  <div className="text-zinc-400 text-[11px] truncate">Hangar Type: {drone.model}</div>
                  <div className="text-zinc-500 text-[11px] flex justify-between">
                    <span>ALT: <span className="text-zinc-100 font-bold">{drone.alt} ft</span></span>
                    <span>SPD: <span className="text-zinc-100 font-bold">{drone.speed} KT</span></span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-[9px] text-zinc-500 pb-1 font-bold">
                      <span className="uppercase tracking-wider">Propulsion Battery</span>
                      <span>{drone.battery}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1">
                      <div className={`h-1 rounded-full ${
                        drone.battery > 50 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                      }`} style={{ width: `${drone.battery}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tactical Readiness Dashboard & Logs */}
        <div className="space-y-6">
          {/* Readiness Tracker */}
          <div className="hud-card rounded-2xl p-6 relative overflow-hidden">
            <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest mb-4 border-b border-white/5 pb-3">
              FAA PART 107 COMMAND HUD READY INDEX
            </h3>
            <div className="text-center py-5 relative">
              {/* Circle Gauge */}
              <div className="inline-flex items-center justify-center relative select-none">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r="62" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                  <circle
                    cx="72"
                    cy="72"
                    r="62"
                    fill="transparent"
                    stroke="#06b6d4"
                    strokeWidth="8"
                    strokeDasharray={389.5}
                    strokeDashoffset={389.5 - (389.5 * Math.max(5, readinessPercentage)) / 100}
                    className="transition-all duration-1000 ease-out"
                    style={{ strokeLinecap: 'round' }}
                  />
                </svg>
                <div className="absolute text-center mt-1">
                  <span className="text-3xl font-mono font-black text-white tracking-tight cyber-glow-cyan">
                    {Math.round(readinessPercentage)}%
                  </span>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 leading-none mt-1">Readiness Score</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3 bg-zinc-950/40 p-3 rounded-xl border border-white/5 shadow-inner">
              <div className="text-center border-r border-white/5">
                <div className="text-lg font-mono text-emerald-400 font-extrabold cyber-glow-emerald">{masteredConceptsCount}/5</div>
                <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block font-bold">Concepts Passed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono text-zinc-100 font-extrabold">{completedQuestionsCount}</div>
                <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block font-bold">Question Logs</div>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-zinc-950 border border-white/5 rounded-xl text-xs font-mono text-center shadow-inner">
              {readinessPercentage >= 80 ? (
                <span className="text-emerald-400 font-bold flex items-center justify-center gap-1.5 cyber-glow-emerald">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FAA OPERATIONAL READY
                </span>
              ) : (
                <span className="text-amber-500 font-bold flex items-center justify-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  STUDY REQD • AIM FOR 80%+
                </span>
              )}
            </div>
          </div>

          {/* Dynamic Flight Logs */}
          <div className="hud-card rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-xs font-bold font-display text-zinc-300 uppercase tracking-widest mb-4 border-b border-white/5 pb-3 flex items-center justify-between">
                <span>Fleet Telemetry Console</span>
                <button
                  onClick={() => {
                    setTelemetryLogs([`UTC ${new Date().toUTCString().substring(17,25)} - SYS PING MANUAL CONFIRMATION.`, ...telemetryLogs.slice(0, 4)]);
                  }}
                  className="text-[9px] text-cyan-400 hover:text-cyan-300 font-mono font-bold tracking-wider hover:underline"
                >
                  TRANSMIT PING
                </button>
              </h3>
              <div className="space-y-3">
                {telemetryLogs.map((log, index) => (
                  <div key={index} className="text-[11px] font-mono text-zinc-400 flex items-start gap-2 py-1.5 border-b border-white/5 last:border-0 leading-normal">
                    <span className="text-cyan-400 font-bold select-none">»</span>
                    <span className="flex-1 min-w-0 break-words">{log}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-5 text-center border-t border-white/5 mt-4">
              <p className="text-[9px] font-mono text-zinc-650 tracking-wider">AISTUDIO TELEMETRY FEED LINK ACTIVE</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
