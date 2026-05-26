import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, AlertTriangle, Play, HelpCircle } from "lucide-react";

export default function DroneShowSystems() {
  const [swarmSize, setSwarmSize] = useState(50);
  const [spectatorDistance, setSpectatorDistance] = useState(120); // Feet
  const [perimeterWidth, setPerimeterWidth] = useState(250); // Feet
  const [wifiChannel, setWifiChannel] = useState("5.8 GHz Dynamic Channel 149");

  const [checklist, setChecklist] = useState({
    rthConfigured: false,
    observerPositioned: false,
    geofenceActive: false,
    frequencySwept: false,
    faaWaiverApproved: false
  });

  // Dynamic show security check
  const getSwarmStatus = () => {
    if (spectatorDistance < 150) {
      return {
        status: "HAZARDOUS SPEC BOUND",
        color: "text-red-500 bg-red-950/20 border-red-500/30",
        message: "SPECTATOR DISTANCE CRITICAL. FAA Section 107.35 waivers generally require spectators to remain at least 150 feet away from the active flight envelope."
      };
    }
    if (swarmSize > 100 && !checklist.faaWaiverApproved) {
      return {
        status: "WAIVER APPROVAL REQUIRED",
        color: "text-amber-500 bg-amber-950/20 border-amber-500/30",
        message: "LARGE SWARM REQUIREMENT. Swarms of more than 100 aircraft demand comprehensive redundancy checklists and pre-approved 107.35 waiver filings before dispatch."
      };
    }
    if (!checklist.geofenceActive || !checklist.rthConfigured) {
      return {
        status: "HARDWARE ARM BLOCK",
        color: "text-amber-500 bg-amber-950/20 border-amber-500/30",
        message: "GEOFENCING & SYSTEM RETURN-TO-HOME MUST BE INITIATED ON THE GROUND BEFORE ENGINES ARM BLOCK REVEAL."
      };
    }
    return {
      status: "CHOREOGRAPHY SAFE - ARMED",
      color: "text-emerald-500 bg-emerald-950/20 border-emerald-500/30",
      message: "Swarm systems normal. Redundant communications checked and spectator margins locked. Safe to launch choreography."
    };
  };

  const status = getSwarmStatus();

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="drone-show-systems-root" className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
          ✨ DYNAMIC SWARM & DRONE SHOW ORCHESTRATOR
        </h2>
        <p className="text-zinc-400 text-xs mt-1 font-mono">
          FAA Part 107 Section 107.35 multi-drone swarm compliance calculations and preflight checks.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Swarm Controls */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-lg space-y-6">
          <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-400 border-b border-zinc-850 pb-2">
            Swarm Architecture & Show Scope Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Swarm Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Fleet Swarm Size:</span>
                <span className="text-white font-bold">{swarmSize} UAS Aircraft</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                value={swarmSize}
                onChange={(e) => setSwarmSize(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 pt-0.5">
                <span>10 Drones</span>
                <span>100 (Standard)</span>
                <span>300 (Mega)</span>
              </div>
            </div>

            {/* Spectator Radius */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Distance to Spectators:</span>
                <span className="text-white font-bold">{spectatorDistance} Feet</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                value={spectatorDistance}
                onChange={(e) => setSpectatorDistance(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 pt-0.5">
                <span>50 ft (Danger)</span>
                <span>150 ft (FAA Min)</span>
                <span>300 ft</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs pt-2">
            {/* Show Perimeter width */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Containment Geofence:</span>
                <span className="text-white font-bold">{perimeterWidth} Ft Radius</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                value={perimeterWidth}
                onChange={(e) => setPerimeterWidth(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase">RF Transmission Feed</label>
              <select
                value={wifiChannel}
                onChange={(e) => setWifiChannel(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 p-2 rounded text-zinc-300 focus:outline-none"
              >
                <option value="5.8 GHz Dynamic Channel 149">5.8 GHz Dynamic Channel 149 (Clear)</option>
                <option value="2.4 GHz High Bandwidth Ch 6">2.4 GHz High Bandwidth Ch 6 (Congested)</option>
                <option value="LTE Cellular Link Encrypted">LTE Cellular Link Encrypted (Waiver Only)</option>
              </select>
            </div>
          </div>

          {/* Interactive Swarm Preflight Checklist */}
          <div className="space-y-3 pt-4 border-t border-zinc-850">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-bold block">
              Pre-Flight Swarm Verification Sequence (Must satisfy safety margins)
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs select-none">
              <div
                onClick={() => toggleCheck("faaWaiverApproved")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  checklist.faaWaiverApproved 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {checklist.faaWaiverApproved ? "✓" : ""}
                </span>
                <span>FAA Part 107 Section 107.35 Waiver Logged</span>
              </div>

              <div
                onClick={() => toggleCheck("geofenceActive")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  checklist.geofenceActive 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {checklist.geofenceActive ? "✓" : ""}
                </span>
                <span>Containment Geofence Active</span>
              </div>

              <div
                onClick={() => toggleCheck("rthConfigured")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  checklist.rthConfigured 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {checklist.rthConfigured ? "✓" : ""}
                </span>
                <span>Individual Fail-safes Preflight and return-home locked</span>
              </div>

              <div
                onClick={() => toggleCheck("observerPositioned")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  checklist.observerPositioned 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {checklist.observerPositioned ? "✓" : ""}
                </span>
                <span>Safety Visual Observer (VO) Array Dispatched</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Swarm Status Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-400 border-b border-zinc-850 pb-2">
              Swarm Clearance Authorization Report
            </h3>

            <div className={`p-4 border rounded-lg space-y-3 font-mono text-xs ${status.color}`}>
              <div className="flex items-center gap-2 font-bold font-sans tracking-wide">
                {spectatorDistance >= 150 && checklist.faaWaiverApproved ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
                )}
                <h4>{status.status}</h4>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed font-sans">{status.message}</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-850 rounded p-4 font-mono text-xs space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Estimated Airspace Constraints:</span>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-400">
                <span>Part 107 Section 107.35 Status:</span>
                <span className={checklist.faaWaiverApproved ? "text-emerald-400" : "text-amber-500"}>
                  {checklist.faaWaiverApproved ? "Waiver Active" : "Waiver Pending"}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-400">
                <span>Drones Arm Block:</span>
                <span className={spectatorDistance >= 150 ? "text-emerald-400" : "text-red-400"}>
                  {spectatorDistance >= 150 ? "Unlocked" : "Spectator Safety Blocked"}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Calculated Spectator Margin:</span>
                <span className={spectatorDistance >= 150 ? "text-emerald-400" : "text-red-400"}>
                  {spectatorDistance} ft / 150 ft
                </span>
              </div>
            </div>

            {/* Launch Show Simulation Button */}
            <button
              onClick={() => {
                if (spectatorDistance >= 150 && checklist.faaWaiverApproved && checklist.geofenceActive) {
                  alert("Choreographed multi-drone swarm commands uploaded to central GCS tower! All flight links normal.");
                } else {
                  alert("Swarm systems alert: Critical safety checks outstanding or spectator safety margin breached.");
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono font-bold py-2 text-xs rounded hover:bg-zinc-900 hover:text-white transition-colors uppercase flex items-center justify-center gap-1.5"
            >
              <Play className="h-3.5 w-3.5 text-blue-500" />
              Simulate Swarm Launch
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
