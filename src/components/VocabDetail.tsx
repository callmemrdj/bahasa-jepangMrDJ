import { useState } from "react";
import { VOCAB_DATA } from "../data/vocabulary";
import TopBar from "./TopBar";

interface Props {
  categoryId: string;
  onBack: () => void;
}

export default function VocabDetail({ categoryId, onBack }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const category = VOCAB_DATA.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div>
        <TopBar title="Kosakata" onBack={onBack} />
        <div className="max-w-2xl mx-auto px-4 pt-10 text-center">
          <p className="text-blue-700">Kategori tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <TopBar title={`${category.icon} ${category.name}`} subtitle={category.description} onBack={onBack} />
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-2.5">
        {category.items.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const hasExample = item.example_jp && item.example_id;
          return (
            <div
              key={item.id}
              className={`
                animate-fade-in stagger-${Math.min(idx + 1, 5)}
                bg-white rounded-xl shadow-md border border-blue-100
                overflow-hidden transition-all
              `}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left px-4 py-3 flex items-center gap-3 active:bg-blue-50/50 transition-colors"
              >
                {/* Kanji */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-blue-900 jp-text leading-tight">
                    {item.kanji}
                  </span>
                  <span className="text-[10px] text-blue-500 jp-text">
                    {item.furigana}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold text-blue-900">
                    {item.meaning}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {item.romaji && (
                      <span className="text-xs text-blue-500 italic">{item.romaji}</span>
                    )}
                    {item.type && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">
                        {item.type}
                      </span>
                    )}
                  </div>
                </div>

                {hasExample && (
                  <svg
                    className={`w-4 h-4 text-blue-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>

              {isExpanded && hasExample && (
                <div className="animate-slide-in-up px-4 pb-3 pt-0">
                  <div className="h-px bg-blue-100 mb-3" />
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-sm sm:text-base font-bold text-blue-900 jp-text">
                      {item.example_jp}
                    </p>
                    <p className="text-xs text-blue-700 italic mt-1">
                      → {item.example_id}
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
