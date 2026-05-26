import React, { useState } from "react";
import { faaResources } from "../data/faaData";
import { Search, ExternalLink, Filter, HelpCircle, Briefcase, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

export default function ResourceCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default expand the first one

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(faaResources.map(r => r.category)))];

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredResources = faaResources
    .filter(res => {
      const matchSearch =
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.relatedConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory === "All" || res.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.category.localeCompare(b.category);
    });

  return (
    <div id="resource-center-root" className="space-y-6">
      {/* Title */}
      <div className="border-b border-zinc-800 pb-3">
        <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
          📰 FAA RESOURCE INTELLIGENCE GATEWAY
        </h2>
        <p className="text-zinc-400 text-xs mt-1 font-mono">
          Federated FAA websites, regulatory documents, policies, and operational safety feeds.
        </p>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search FAA resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-850 rounded text-xs py-2 pl-9 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto select-none">
          <Filter className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
          <div className="flex gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-1 borders rounded border shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    : "bg-zinc-950 text-zinc-500 border-zinc-850 hover:text-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting Toggle */}
        <div className="flex justify-end items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "category")}
            className="bg-zinc-950 border border-zinc-850 text-zinc-300 rounded text-xs p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="name">Alphanumeric (A-Z)</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredResources.length === 0 ? (
          <div className="lg:col-span-2 text-center py-12 bg-zinc-900 border border-zinc-850 rounded-lg text-zinc-500 text-xs font-mono">
            No matching FAA intelligence assets logged. Try alternative keywords.
          </div>
        ) : (
          filteredResources.map((res, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={res.name}
                className={`bg-zinc-900 border transition-all duration-200 rounded-lg overflow-hidden flex flex-col justify-between ${
                  isExpanded ? "border-blue-500/30 ring-1 ring-blue-500/15" : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {/* Header */}
                <div
                  onClick={() => handleToggleExpand(index)}
                  className="p-4 cursor-pointer hover:bg-zinc-850/50 flex justify-between items-start gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono whitespace-nowrap bg-zinc-950 border border-zinc-805 px-2 py-0.5 text-zinc-400 rounded">
                        {res.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">• {res.relatedConcepts[0]}</span>
                    </div>
                    <h3 className="font-sans font-bold text-sm tracking-wide text-white">{res.name}</h3>
                  </div>
                  <div className="text-zinc-500 hover:text-zinc-300">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                {/* Expanded Section */}
                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-zinc-850 bg-zinc-950/40 text-xs font-mono space-y-4">
                    {/* Description Purpose */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Operational Purpose:</span>
                      <p className="text-zinc-300 text-xs leading-relaxed">{res.purpose}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1.5 border-t border-zinc-900">
                      {/* Exam relevance */}
                      <div className="space-y-1 flex items-start gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Part 107 Exam Relevance:</span>
                          <p className="text-zinc-400 text-[11px] leading-snug mt-0.5">{res.examRelevance}</p>
                        </div>
                      </div>

                      {/* Business relevance */}
                      <div className="space-y-1 flex items-start gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Aviation Business Value:</span>
                          <p className="text-zinc-400 text-[11px] leading-snug mt-0.5">{res.businessRelevance}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-900">
                      <span className="text-[10px] text-zinc-500">Related Maps/Codes:</span>
                      {res.relatedConcepts.map(t => (
                        <span key={t} className="text-[10px] bg-zinc-950 border border-zinc-850 px-1.5 py-0.5 rounded text-blue-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Link */}
                <div className="p-3 bg-zinc-950/60 border-t border-zinc-850 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold">
                  <span className="text-[10px] text-zinc-650 truncate max-w-[200px] font-normal">{res.url.replace("https://", "")}</span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors text-[10px]"
                  >
                    Open Live FAA Web <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
