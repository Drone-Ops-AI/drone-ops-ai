import React, { useState } from "react";
import { Calculator, DollarSign, PieChart, TrendingUp, Info } from "lucide-react";

export default function BusinessIntelligence() {
  const [pilotRate, setPilotRate] = useState(75); // $ per hour
  const [depreciationRate, setDepreciationRate] = useState(20); // $ per hour drone wear/tear
  const [insurancePerJob, setInsurancePerJob] = useState(150); // Flat $ rate
  const [projectHours, setProjectHours] = useState(12); // Number of flights/hours
  const [profitMarkup, setProfitMarkup] = useState(35); // % profit markup

  // Calculate Fleet economics
  const rawLaborCost = pilotRate * projectHours;
  const rawHardwareDepreciation = depreciationRate * projectHours;
  const totalCostOfWork = rawLaborCost + rawHardwareDepreciation + insurancePerJob;
  const calculatedProfitAmount = Math.round(totalCostOfWork * (profitMarkup / 100));
  const recommendedSaaSQuote = totalCostOfWork + calculatedProfitAmount;

  return (
    <div id="business-intelligence-root" className="space-y-6">
      {/* Title */}
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
          💼 BUSINESS INTELLIGENCE & FLEET ECONOMICS
        </h2>
        <p className="text-zinc-400 text-xs mt-1 font-mono">
          Interactive commercial bidding models, drone operational cost math, and ROI projections.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Bid Calculator */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-lg space-y-6">
          <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-400 border-b border-zinc-850 pb-2 flex justify-between items-center">
            <span>Commercial Project Bid Calculator</span>
            <Calculator className="h-4 w-4 text-blue-500" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Pilot Wage */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Pilot Wage:</span>
                <span className="text-white font-bold">${pilotRate}/Hr</span>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                value={pilotRate}
                onChange={(e) => setPilotRate(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-650 pt-0.5">
                <span>$30/hr (Intern)</span>
                <span>$100/hr (Senior PIC)</span>
                <span>$200/hr</span>
              </div>
            </div>

            {/* Hardware Depr */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Frame Depreciation:</span>
                <span className="text-white font-bold">${depreciationRate}/Hr</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={depreciationRate}
                onChange={(e) => setDepreciationRate(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-950 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-650 pt-0.5">
                <span>$5/hr (Mavic 3)</span>
                <span>$40/hr (Matrice Heavy)</span>
                <span>$80/hr</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs pt-2">
            {/* Project Hours */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">Planned Flight Hours</label>
              <input
                type="number"
                min="1"
                max="100"
                value={projectHours}
                onChange={(e) => setProjectHours(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-zinc-950 border border-zinc-850 p-2 rounded text-zinc-200 focus:outline-none"
              />
            </div>

            {/* Insurance Flat Cost */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">Flat Insurance / Job</label>
              <input
                type="number"
                min="0"
                max="1000"
                value={insurancePerJob}
                onChange={(e) => setInsurancePerJob(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-zinc-950 border border-zinc-850 p-2 rounded text-zinc-200 focus:outline-none"
              />
            </div>

            {/* Profit Margin Markup % */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">Desired Markup %</label>
              <input
                type="number"
                min="5"
                max="200"
                value={profitMarkup}
                onChange={(e) => setProfitMarkup(Math.max(5, parseInt(e.target.value) || 5))}
                className="w-full bg-zinc-950 border border-zinc-850 p-2 rounded text-zinc-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 bg-zinc-950 border border-zinc-850 rounded-lg flex items-start gap-2.5 text-xs font-mono text-zinc-400">
            <Info className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
            <p className="leading-normal">
              Commercial UAS pricing incorporates **Part 107 crew constraints** (Remote PIC + visual observers), hourly machine airframe runtime depreciation, and specialized commercial aviation liability insurance.
            </p>
          </div>
        </div>

        {/* Dynamic Financial outputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-400 border-b border-zinc-850 pb-2">
              Financial Quote Forecast
            </h3>

            {/* Quote Reveal Gauge */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-5 text-center font-mono space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Suggested Project Bid Price</span>
              <div className="text-3xl font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                <DollarSign className="h-7 w-7 text-emerald-400 shrink-0" />
                {recommendedSaaSQuote.toLocaleString()}
              </div>
              <p className="text-[10px] text-zinc-500">Includes {profitMarkup}% desired operational profit markup.</p>
            </div>

            {/* Breakdown costs */}
            <div className="bg-zinc-950 border border-zinc-850 rounded p-4 font-mono text-xs space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block pb-1.5">Aviation Bid breakdown:</span>
              
              <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-400">
                <span>Total Labor Costs (Wage x hours):</span>
                <span className="text-white">${rawLaborCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-400">
                <span>Machine Wear/Tear (Depr x hours):</span>
                <span className="text-white">${rawHardwareDepreciation.toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-400">
                <span>Job Liability Insurance:</span>
                <span className="text-white">${insurancePerJob.toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-400">
                <span className="font-bold">Total Operational Costs (COGS):</span>
                <span className="text-zinc-200 font-bold">${totalCostOfWork.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-zinc-400 pt-1">
                <span className="font-bold text-emerald-400">Estimated Net Operational Profit:</span>
                <span className="text-emerald-400 font-bold">${calculatedProfitAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-850 p-2.5 rounded text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Business ROI Ratio:</span>
              <span className="text-white font-bold">{(recommendedSaaSQuote / totalCostOfWork).toFixed(2)}x Profit-COGS Ratio</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
