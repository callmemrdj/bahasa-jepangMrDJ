import type { Page } from "../App";

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const MENU_ITEMS = [
  {
    icon: "📖",
    title: "Tatabahasa",
    subtitle: "Pola kalimat N5 — N1",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/30",
    page: { name: "grammar" as const },
  },
  {
    icon: "📚",
    title: "Kosakata",
    subtitle: "Kata kerja, sifat, onomatope...",
    gradient: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/30",
    page: { name: "vocabulary" as const },
  },
  {
    icon: "字",
    title: "Kanji",
    subtitle: "Jukugo & urutan penulisan",
    gradient: "from-violet-500 to-blue-600",
    shadow: "shadow-violet-500/30",
    page: { name: "kanji" as const },
  },
  {
    icon: "🃏",
    title: "Flashcard",
    subtitle: "Cocokkan kosakata & kanji",
    gradient: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/30",
    page: { name: "flashcard" as const },
  },
  {
    icon: "📝",
    title: "Quiz",
    subtitle: "Uji kemampuanmu!",
    gradient: "from-indigo-500 to-blue-600",
    shadow: "shadow-indigo-500/30",
    page: { name: "quiz" as const },
  },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen min-h-[100dvh] pb-8">
      {/* Hero Header */}
      <div className="hero-gradient px-4 pt-8 pb-12 sm:pt-12 sm:pb-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute top-10 right-20 w-8 h-8 rounded-full bg-white/10" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-white">日</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            日本語を学ぶ
          </h1>
          <p className="text-sm sm:text-base text-blue-100">
            Belajar Bahasa Jepang Jadi Mudah & Menyenangkan
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 sm:-mt-8">
        <div className="grid gap-3 sm:gap-4">
          {MENU_ITEMS.map((item, idx) => (
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
                active:scale-[0.99] transition-all
                group
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl
                  bg-gradient-to-br ${item.gradient}
                  flex items-center justify-center shadow-md ${item.shadow}
                  group-hover:scale-105 transition-transform
                `}>
                  <span className={`text-2xl sm:text-3xl ${item.title === "Kanji" ? "text-white font-bold" : ""}`}>
                    {item.icon}
                  </span>
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

        {/* Tips Section */}
        <div className="mt-6 sm:mt-8 bg-white/80 backdrop-blur rounded-2xl shadow-md p-4 sm:p-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💡</span>
            <h3 className="font-bold text-blue-900 text-sm sm:text-base">Tips Belajar</h3>
          </div>
          <div className="space-y-2">
            {[
              "Mulai dari level N5 dan naikkan secara bertahap",
              "Gunakan Flashcard untuk menghafal kosakata baru",
              "Latihan menulis Kanji untuk memperkuat ingatan",
              "Ikuti Quiz secara rutin untuk mengukur kemajuan",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                <p className="text-xs sm:text-sm text-blue-800/90">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-blue-600/50 mt-6 pb-4">
          © 日本語を学ぶ — Belajar Bahasa Jepang
        </p>
      </div>
    </div>
  );
}
