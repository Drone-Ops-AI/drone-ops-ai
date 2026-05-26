import React, { useState } from "react";
import { AlertTriangle, CloudSnow, Sun, Thermometer, ShieldAlert, CheckCircle } from "lucide-react";

export default function ArcticOperations() {
  const [ambientTemp, setAmbientTemp] = useState(-5); // Degrees C
  const [batteryPrewarm, setBatteryPrewarm] = useState(true);
  const [humidity, setHumidity] = useState(85); // % Relative Humidity
  const [propHeating, setPropHeating] = useState(false);

  const [arcticChecklist, setArcticChecklist] = useState({
    insulatedCover: false,
    voltageTelemActive: false,
    fluidInspection: false,
    rotorIcingSwept: false,
    emergencyFlaresChecked: false
  });

  const toggleArcticCheck = (key: keyof typeof arcticChecklist) => {
    setArcticChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Dynamic Icing evaluation
  const getIcingRisk = () => {
    if (ambientTemp <= 0 && humidity > 70) {
      return {
        rating: "CRITICAL SEVERE ICING RISK",
        color: "text-red-500 bg-red-950/20 border-red-500/30",
        desc: "Icing conditions occurring. Sub-zero temperatures and high relative humidity lead to immediate ice accretion on lifting rotors, resulting in loss of lift and aerodynamic control."
      };
    }
    if (ambientTemp <= 5 && humidity > 60) {
      return {
        rating: "MODERATE ICING FOCUS",
        color: "text-amber-500 bg-amber-950/20 border-amber-500/30",
        desc: "Freezing drizzle boundary. Keep drone within line of sight, and land immediately at any sign of sluggish mechanical yaw responses."
      };
    }
    return {
      rating: "NOMINAL TEMPERATURE SAFETY",
      color: "text-blue-500 bg-blue-950/20 border-blue-500/20",
      desc: "Rotor icing risk is negligible. Continuous flight permitted with standard structural checkouts."
    };
  };

  const icingRisk = getIcingRisk();

  // Dynamic LiPo Battery Depletion calculation
  // Cold batteries lose voltage rapidly. 
  // Base efficiency is 100%. -1C to -15C drops efficiency linearly.
  // Pre-warming batteries mitigates the drop by 25%.
  const getBatteryEfficiency = () => {
    let loss = 0;
    if (ambientTemp < 15) {
      const tempDiff = 15 - ambientTemp;
      loss = Math.round(tempDiff * 2.5); // 2.5% drop per degree C below 15C
      if (batteryPrewarm) loss = Math.round(loss * 0.4); // 60% mitigation
    }
    return Math.max(30, 100 - loss);
  };

  const batteryEfficiency = getBatteryEfficiency();

  return (
    <div id="arctic-operations-root" className="space-y-6">
      {/* Title */}
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2 font-mono">
          ❄️ SUB-ZERO & ARCTIC OPERATIONS INTERCEPT
        </h2>
        <p className="text-zinc-400 text-xs mt-1 font-mono">
          Sub-zero climate adaptations, thermal battery drop calculations, and rotor ice accretion mitigations.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Arctic Telemetry Controls */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-lg space-y-6">
          <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-400 border-b border-zinc-850 pb-2 flex justify-between items-center">
            <span>Sub-Zero Meteorological Simulator</span>
            <Thermometer className="h-4 w-4 text-blue-400 animate-pulse" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Ambient Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Arctic Ambient Temp:</span>
                <span className="text-white font-bold">{ambientTemp}°C ({Math.round(ambientTemp * 1.8 + 32)}°F)</span>
              </div>
              <input
                type="range"
                min="-20"
                max="15"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 pt-0.5">
                <span>-20°C (Polar limit)</span>
                <span>0°C (Freezing)</span>
                <span>15°C (Standard)</span>
              </div>
            </div>

            {/* Humidity Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Relative Humidity (Rh):</span>
                <span className="text-white font-bold">{humidity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs items-center select-none">
            {/* Battery Pre-warming Toggle */}
            <div 
              onClick={() => setBatteryPrewarm(!batteryPrewarm)}
              className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                batteryPrewarm 
                  ? "bg-blue-500/10 border-blue-500 text-blue-400" 
                  : "bg-zinc-950 border-zinc-85c text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-zinc-500 font-bold uppercase">Preflight Conditioning</span>
                <span className="text-xs font-bold">Pre-Warm LiPo Batteries</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${batteryPrewarm ? "bg-blue-500/20" : "bg-zinc-900"}`}>
                {batteryPrewarm ? "ACTIVE PRE-WARM" : "OFFLINE"}
              </span>
            </div>

            {/* Heated Props */}
            <div 
              onClick={() => setPropHeating(!propHeating)}
              className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                propHeating 
                  ? "bg-blue-500/10 border-blue-500 text-blue-400" 
                  : "bg-zinc-950 border-zinc-85c text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-zinc-500 font-bold uppercase">Anti-Icing Hardware</span>
                <span className="text-xs font-bold">Active Rotor Prop Heating</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${propHeating ? "bg-blue-500/20" : "bg-zinc-900"}`}>
                {propHeating ? "HEATER ON" : "CONVENTIONAL"}
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-3 pt-4 border-t border-zinc-850">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-bold block">
              Polar Preflight Safety Checklist (Emergency Icing Directives)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs select-none">
              <div
                onClick={() => toggleArcticCheck("insulatedCover")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  arcticChecklist.insulatedCover 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {arcticChecklist.insulatedCover ? "✓" : ""}
                </span>
                <span>Install Thermal GCS Insulated Cover</span>
              </div>

              <div
                onClick={() => toggleArcticCheck("voltageTelemActive")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  arcticChecklist.voltageTelemActive 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {arcticChecklist.voltageTelemActive ? "✓" : ""}
                </span>
                <span>Active Core Voltage Drops Telemetry Alert</span>
              </div>

              <div
                onClick={() => toggleArcticCheck("fluidInspection")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  arcticChecklist.fluidInspection 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {arcticChecklist.fluidInspection ? "✓" : ""}
                </span>
                <span>Preflight moisture check on motor assemblies</span>
              </div>

              <div
                onClick={() => toggleArcticCheck("rotorIcingSwept")}
                className={`p-2.5 border rounded cursor-pointer transition-colors flex items-center gap-2.5 ${
                  arcticChecklist.rotorIcingSwept 
                    ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-300"
                    : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <span className="h-4 w-4 shrink-0 border border-zinc-750 rounded-xs flex items-center justify-center text-[10px] font-bold">
                  {arcticChecklist.rotorIcingSwept ? "✓" : ""}
                </span>
                <span>Manual verification of rotors free from ice</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Arctic Analysis Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-400 border-b border-zinc-850 pb-2">
              Micro-Climate Analytical Feedback
            </h3>

            {/* Icing Severity Alert */}
            <div className={`p-4 border rounded-lg space-y-2 font-mono text-xs ${icingRisk.color}`}>
              <div className="flex items-center gap-2 font-bold font-sans tracking-wide">
                <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5 text-white/95" />
                <h4>{icingRisk.rating}</h4>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed font-sans">{icingRisk.desc}</p>
            </div>

            {/* LiPo battery thermal health score */}
            <div className="bg-zinc-950 border border-zinc-850 rounded p-4 font-mono text-xs space-y-3">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Calculated Lithium Chemistry Performance:</span>
              
              <div className="flex justify-between items-baseline">
                <span className="text-zinc-400">Battery Efficiency:</span>
                <span className={`text-xl font-bold ${
                  batteryEfficiency >= 80 ? "text-emerald-400" : batteryEfficiency >= 60 ? "text-amber-400" : "text-red-400"
                }`}>{batteryEfficiency}%</span>
              </div>

              {/* Graphical representation bar */}
              <div className="w-full bg-zinc-900 h-2 border border-zinc-850 rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-500 ${
                    batteryEfficiency >= 80 ? "bg-emerald-500" : batteryEfficiency >= 60 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${batteryEfficiency}%` }}
                />
              </div>

              <div className="text-[10px] text-zinc-500 pt-1 leading-normal">
                {batteryPrewarm ? (
                  <span className="text-blue-400 font-bold">✓ LiPo conditioning reduces physical cell voltage collapse risks significantly.</span>
                ) : (
                  <span className="text-amber-500 block">⚠️ Cold cell chemical limits apply! Heavy full throttle maneuvers carry risk of instant drone mid-air motor cutoff.</span>
                )}
              </div>
            </div>

            <div className="text-center p-2.5 bg-zinc-950 rounded border border-zinc-850 text-[10px] font-mono text-zinc-500">
              POLAR WEATHER LINK ACTIVE • GPS CALIBRATION LOCK STATUS
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
