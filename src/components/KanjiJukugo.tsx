import { useState } from "react";
import { JUKUGO_DATA } from "../data/kanji";
import TopBar from "./TopBar";

interface Props {
  onBack: () => void;
}

export default function KanjiJukugo({ onBack }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="pb-8">
      <TopBar title="字 Jukugo (熟語)" subtitle="Komponen kanji, bacaan & contoh" onBack={onBack} />
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
        {JUKUGO_DATA.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`
                animate-fade-in stagger-${Math.min(idx + 1, 5)}
                bg-white rounded-2xl shadow-md border border-blue-100
                overflow-hidden transition-all
              `}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left px-4 py-4 flex items-center gap-4 active:bg-blue-50/50 transition-colors"
              >
                {/* Big Kanji */}
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 border-2 border-violet-200 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-violet-800 jp-text">
                    {item.kanji}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-bold text-blue-900">
                    {item.meaning}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-semibold">
                      {item.level}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                      {item.strokes} stroke
                    </span>
                  </div>
                </div>

                <svg
                  className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isExpanded && (
                <div className="animate-slide-in-up px-4 pb-4 pt-0 space-y-3">
                  <div className="h-px bg-blue-100" />

                  {/* Readings */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                      <p className="text-[10px] font-semibold text-orange-600 mb-1">音読み (Onyomi)</p>
                      <p className="text-base font-bold text-orange-800 jp-text">{item.onyomi}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                      <p className="text-[10px] font-semibold text-blue-600 mb-1">訓読み (Kunyomi)</p>
                      <p className="text-base font-bold text-blue-800 jp-text">{item.kunyomi}</p>
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <p className="text-xs font-semibold text-blue-700 mb-2">📝 Contoh Jukugo</p>
                    <div className="space-y-2">
                      {item.examples.map((ex, i) => (
                        <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-lg p-2.5 border border-blue-100">
                          <span className="text-lg font-bold text-blue-900 jp-text flex-shrink-0 w-16 text-center">
                            {ex}
                          </span>
                          <span className="text-sm text-blue-700">
                            {item.example_meanings[i]}
                          </span>
                        </div>
                      ))}
                    </div>
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
