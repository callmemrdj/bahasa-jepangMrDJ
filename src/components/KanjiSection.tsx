import type { Page } from "../App";
import TopBar from "./TopBar";

interface Props {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

const KANJI_MENU = [
  {
    icon: "組",
    title: "Jukugo (熟語)",
    subtitle: "Komponen & gabungan kanji, onyomi & kunyomi",
    gradient: "from-violet-500 to-indigo-600",
    shadow: "shadow-violet-500/30",
    page: { name: "kanji-jukugo" as const },
  },
  {
    icon: "書",
    title: "Urutan Penulisan (書き順)",
    subtitle: "Cara menulis kanji dari stroke pertama",
    gradient: "from-blue-500 to-cyan-600",
    shadow: "shadow-blue-500/30",
    page: { name: "kanji-stroke" as const },
  },
];

export default function KanjiSection({ onNavigate, onBack }: Props) {
  return (
    <div className="pb-8">
      <TopBar title="字 Kanji" subtitle="Pelajari kanji bahasa Jepang" onBack={onBack} />
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
        {KANJI_MENU.map((item, idx) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onNavigate(item.page)}
            className={`
              animate-fade-in stagger-${idx + 1}
              w-full text-left p-4 sm:p-5 rounded-2xl
              bg-white shadow-lg ${item.shadow}
              border border-blue-50
              hover:shadow-xl hover:scale-[1.01]
              active:scale-[0.99] transition-all group
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl
                bg-gradient-to-br ${item.gradient}
                flex items-center justify-center shadow-md ${item.shadow}
                group-hover:scale-105 transition-transform
              `}>
                <span className="text-white text-2xl sm:text-3xl font-bold">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-0.5">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-blue-600/80">
                  {item.subtitle}
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
