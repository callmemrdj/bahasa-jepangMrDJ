import type { Page } from "../App";
import { GRAMMAR_DATA } from "../data/grammar";
import TopBar from "./TopBar";

interface Props {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export default function GrammarSection({ onNavigate, onBack }: Props) {
  return (
    <div className="pb-8">
      <TopBar title="📖 Tatabahasa" subtitle="Pola kalimat berdasarkan level JLPT" onBack={onBack} />
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
        {GRAMMAR_DATA.map((level, idx) => (
          <button
            key={level.level}
            type="button"
            onClick={() => onNavigate({ name: "grammar-detail", level: level.level })}
            className={`
              animate-fade-in stagger-${idx + 1}
              w-full text-left p-4 sm:p-5 rounded-2xl
              bg-white shadow-md border ${level.bgColor}
              hover:shadow-lg hover:scale-[1.01]
              active:scale-[0.99] transition-all group
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl
                ${level.bgColor} border ${level.bgColor}
                flex items-center justify-center
                group-hover:scale-105 transition-transform
              `}>
                <span className={`text-2xl sm:text-3xl font-extrabold ${level.color}`}>
                  {level.level}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-0.5">
                  {level.label}
                </h2>
                <p className="text-xs sm:text-sm text-blue-600/80">
                  {level.items.length} pola kalimat
                </p>
              </div>
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
