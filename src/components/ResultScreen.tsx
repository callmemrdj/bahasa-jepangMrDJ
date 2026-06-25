interface ResultScreenProps {
  nama: string;
  benar: number;
  totalSoal: number;
  nilai: number;
  persentase: number;
  timeUp: boolean;
  onRestart: () => void;
  saving: boolean;
  saved: boolean | null;
}

function getGrade(percent: number): { label: string; color: string; bg: string; emoji: string } {
  if (percent >= 90) return { label: "Sempurna!", color: "text-blue-700", bg: "bg-blue-100", emoji: "🏆" };
  if (percent >= 80) return { label: "Sangat Baik", color: "text-blue-700", bg: "bg-blue-100", emoji: "🌟" };
  if (percent >= 70) return { label: "Baik", color: "text-blue-700", bg: "bg-blue-100", emoji: "👍" };
  if (percent >= 60) return { label: "Cukup", color: "text-amber-700", bg: "bg-amber-100", emoji: "💪" };
  return { label: "Tetap Semangat", color: "text-blue-700", bg: "bg-blue-100", emoji: "📚" };
}

export default function ResultScreen({
  nama,
  benar,
  totalSoal,
  nilai,
  persentase,
  timeUp,
  onRestart,
  saving,
  saved,
}: ResultScreenProps) {
  const grade = getGrade(persentase);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30 mb-3">
          <svg className="w-9 h-9 sm:w-11 sm:h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
          Tes Selesai
        </h1>
        <p className="text-sm sm:text-base text-blue-700/80">
          Terima kasih, <span className="font-semibold">{nama}</span>!
        </p>
      </div>

      {/* Time up notice */}
      {timeUp && (
        <div className="mb-3 p-3 bg-amber-50 border-2 border-amber-200 rounded-xl flex items-start gap-2">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            Waktu habis. Jawaban Anda dikirim secara otomatis.
          </p>
        </div>
      )}

      {/* Main score card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 p-5 sm:p-7 border border-blue-100 mb-3">
        <div className="text-center">
          <p className="text-sm text-blue-600 mb-1 font-medium">Skor Anda</p>
          <div className="relative inline-block">
            <p className={`text-6xl sm:text-7xl font-bold ${grade.color} tabular-nums`}>
              {nilai}
            </p>
          </div>
          <p className="text-sm text-blue-600 mt-1 font-medium">dari 100</p>

          <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full ${grade.bg}`}>
            <span className="text-base">{grade.emoji}</span>
            <span className={`text-xs sm:text-sm font-semibold ${grade.color}`}>{grade.label}</span>
          </div>
        </div>

        {/* Percentage ring */}
        <div className="mt-5 pt-5 border-t border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Persentase</span>
            <span className="text-sm font-bold text-blue-900 tabular-nums">{persentase.toFixed(1)}%</span>
          </div>
          <div className="relative h-3 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(persentase, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-5">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600 mb-0.5">Benar</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-700 tabular-nums">{benar}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600 mb-0.5">Soal</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-700 tabular-nums">{totalSoal}</p>
          </div>
        </div>
      </div>

      {/* Save status */}
      <div className="bg-white rounded-xl shadow-md shadow-blue-900/5 p-3 border border-blue-100 mb-3 flex items-center gap-2">
        {saving ? (
          <>
            <svg className="animate-spin h-4 w-4 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-xs sm:text-sm text-blue-700">Menyimpan hasil...</p>
          </>
        ) : saved === true ? (
          <>
            <svg className="w-4 h-4 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p className="text-xs sm:text-sm text-blue-700">Hasil telah tersimpan</p>
          </>
        ) : saved === false ? (
          <>
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-xs sm:text-sm text-amber-700">Gagal menyimpan ke server</p>
          </>
        ) : null}
      </div>

      {/* Restart button */}
      <button
        type="button"
        onClick={onRestart}
        disabled={saving}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 transition-all"
      >
        <span className="inline-flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Tes Lagi
        </span>
      </button>

      <p className="text-center text-xs text-blue-700/60 mt-4">
        © Tes Online • Powered by Google Sheets
      </p>
    </div>
  );
}
