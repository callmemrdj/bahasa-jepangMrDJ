import type { Page } from "../App";
import { VOCAB_DATA } from "../data/vocabulary";
import TopBar from "./TopBar";

interface Props {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export default function VocabSection({ onNavigate, onBack }: Props) {
  return (
    <div className="pb-8">
      <TopBar title="📚 Kosakata" subtitle="Kumpulan kosakata bahasa Jepang" onBack={onBack} />
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
        {VOCAB_DATA.map((cat, idx) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onNavigate({ name: "vocab-detail", categoryId: cat.id })}
            className={`
              animate-fade-in stagger-${Math.min(idx + 1, 5)}
              w-full text-left p-4 sm:p-5 rounded-2xl
              bg-white shadow-md border ${cat.bgColor}
              hover:shadow-lg hover:scale-[1.01]
              active:scale-[0.99] transition-all group
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl
                ${cat.bgColor} border ${cat.bgColor}
                flex items-center justify-center
                group-hover:scale-105 transition-transform
              `}>
                <span className="text-2xl sm:text-3xl">{cat.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-0.5">
                  {cat.name}
                </h2>
                <p className="text-xs sm:text-sm text-blue-600/80 line-clamp-1">
                  {cat.description}
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  {cat.items.length} kosakata
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
