import { useState } from "react";
import { Question } from "../lib/googleSheets";

interface WelcomeScreenProps {
  questions: Question[];
  onStart: (name: string, totalQuestions: number, durationMinutes: number) => void;
  loading: boolean;
}

// Default konfigurasi tes
const DEFAULT_QUESTION_COUNT = 10;
const DEFAULT_DURATION_MINUTES = 10;

export default function WelcomeScreen({ questions, onStart, loading }: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Nama harus diisi minimal 2 karakter");
      return;
    }
    setError("");
    // Pakai jumlah soal yang tersedia (max DEFAULT_QUESTION_COUNT)
    const total = Math.min(DEFAULT_QUESTION_COUNT, questions.length);
    onStart(trimmed, total, DEFAULT_DURATION_MINUTES);
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto px-4 py-6 sm:py-10">
      {/* Header / Logo */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30 mb-4">
          <svg className="w-9 h-9 sm:w-11 sm:h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">Tes Online</h1>
        <p className="text-sm sm:text-base text-blue-700/80">Uji pengetahuan Anda sekarang</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 p-5 sm:p-7 border border-blue-100">
        <div className="space-y-5">
          {/* Nama */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Masukkan nama Anda"
              maxLength={50}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-blue-900 placeholder-blue-300 text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleStart();
              }}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 animate-fade-in">{error}</p>
            )}
          </div>

          {/* Info: Detail tes */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className="text-sm font-semibold text-blue-900">Detail Tes</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Jumlah soal */}
              <div className="bg-white rounded-lg p-2.5 border border-blue-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                    <line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                  <span className="text-[10px] sm:text-xs text-blue-600 font-medium">Jumlah Soal</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-blue-900 tabular-nums">
                  {Math.min(DEFAULT_QUESTION_COUNT, questions.length)} <span className="text-xs font-normal text-blue-600">soal</span>
                </p>
              </div>

              {/* Durasi */}
              <div className="bg-white rounded-lg p-2.5 border border-blue-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-[10px] sm:text-xs text-blue-600 font-medium">Durasi</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-blue-900 tabular-nums">
                  {DEFAULT_DURATION_MINUTES} <span className="text-xs font-normal text-blue-600">menit</span>
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-blue-100 space-y-1.5">
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-[11px] sm:text-xs text-blue-800 leading-relaxed">
                  Soal akan diacak untuk setiap peserta
                </p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-[11px] sm:text-xs text-blue-800 leading-relaxed">
                  Jika waktu habis, jawaban akan otomatis dikirim
                </p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-[11px] sm:text-xs text-blue-800 leading-relaxed">
                  Hasil nilai akan dikirim ke database
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleStart}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Memuat soal...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Mulai Tes
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-blue-700/60 mt-4">
        © Tes Online • Powered by Google Sheets
      </p>
    </div>
  );
}
