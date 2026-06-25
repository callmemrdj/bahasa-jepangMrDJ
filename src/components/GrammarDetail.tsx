import { useState } from "react";
import { GRAMMAR_DATA } from "../data/grammar";
import TopBar from "./TopBar";

interface Props {
  level: string;
  onBack: () => void;
}

export default function GrammarDetail({ level, onBack }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const levelData = GRAMMAR_DATA.find((l) => l.level === level);
  if (!levelData) {
    return (
      <div>
        <TopBar title="Tatabahasa" onBack={onBack} />
        <div className="max-w-2xl mx-auto px-4 pt-10 text-center">
          <p className="text-blue-700">Level tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <TopBar title={`${levelData.level} — Tatabahasa`} subtitle={levelData.label} onBack={onBack} />
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
        {levelData.items.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`animate-fade-in stagger-${Math.min(idx + 1, 5)} bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden transition-all`}
            >
              {/* Pattern Header (clickable) */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left p-4 flex items-start gap-3 active:bg-blue-50/50 transition-colors"
              >
                <div className={`
                  flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg
                  ${levelData.bgColor} border ${levelData.bgColor}
                  flex items-center justify-center
                `}>
                  <span className={`text-xs sm:text-sm font-bold ${levelData.color}`}>
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-bold text-blue-900 jp-text">
                    {item.pattern}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 mt-0.5">
                    {item.meaning}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-blue-400 flex-shrink-0 mt-1 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="animate-slide-in-up px-4 pb-4 pt-0 space-y-3">
                  <div className="h-px bg-blue-100" />

                  {/* Explanation */}
                  <div>
                    <p className="text-xs font-semibold text-blue-700 mb-1">📝 Penjelasan</p>
                    <p className="text-sm text-blue-800 leading-relaxed">{item.explanation}</p>
                  </div>

                  {/* Example */}
                  <div className="bg-blue-50 rounded-xl p-3 space-y-2 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-700">💬 Contoh Kalimat</p>
                    <p className="text-base sm:text-lg font-bold text-blue-900 jp-text">
                      {item.example_jp}
                    </p>
                    {item.example_furigana && (
                      <p className="text-xs text-blue-500 jp-text">
                        {item.example_furigana}
                      </p>
                    )}
                    <p className="text-sm text-blue-700 italic">
                      {item.example_id}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
