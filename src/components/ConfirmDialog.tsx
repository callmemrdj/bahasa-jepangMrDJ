interface ConfirmDialogProps {
  open: boolean;
  totalSoal: number;
  answeredCount: number;
  unansweredCount: number;
  timeLeft: number;
  onConfirm: () => void;
  onCancel: () => void;
  saving: boolean;
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function ConfirmDialog({
  open,
  totalSoal,
  answeredCount,
  unansweredCount,
  timeLeft,
  onConfirm,
  onCancel,
  saving,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl shadow-blue-900/30 border border-blue-100 overflow-hidden animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-5 pt-5 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur mb-3">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Kirim Jawaban?</h2>
          <p className="text-xs text-blue-100">Pastikan semua jawaban sudah benar</p>
        </div>

        {/* Body */}
        <div className="px-5 py-4 -mt-2">
          {/* Stats */}
          <div className="bg-blue-50 rounded-xl p-3 space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span className="text-sm text-blue-800">Sudah dijawab</span>
              </div>
              <span className="text-sm font-bold text-blue-700 tabular-nums">
                {answeredCount} / {totalSoal}
              </span>
            </div>

            {unansweredCount > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-amber-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="text-sm text-blue-800">Belum dijawab</span>
                </div>
                <span className="text-sm font-bold text-amber-600 tabular-nums">
                  {unansweredCount}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-blue-100">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm text-blue-800">Sisa waktu</span>
              </div>
              <span className="text-sm font-bold text-blue-700 tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Warning if unanswered */}
          {unansweredCount > 0 && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p className="text-xs text-amber-800 leading-relaxed">
                Anda masih memiliki <span className="font-bold">{unansweredCount} soal</span> yang belum dijawab. Soal yang kosong akan dihitung salah.
              </p>
            </div>
          )}

          {unansweredCount === 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-4 flex items-start gap-2">
              <svg
                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p className="text-xs text-blue-800 leading-relaxed">
                Semua soal sudah terjawab. Siap mengirim hasil.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="py-3 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 active:scale-95 disabled:opacity-40 transition-all"
            >
              Periksa Lagi
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={saving}
              className="py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm shadow-md shadow-blue-500/30 active:scale-95 disabled:opacity-50 transition-all"
            >
              {saving ? (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Mengirim
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  Ya, Kirim
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
