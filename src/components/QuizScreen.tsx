import { useEffect, useRef, useState } from "react";
import { Question } from "../lib/googleSheets";
import ConfirmDialog from "./ConfirmDialog";

export interface AnsweredQuestion {
  questionId: number;
  userAnswer: string; // "", "A", "B", "C", "D"
}

export interface QuizFinishData {
  answers: AnsweredQuestion[];
  timeUp: boolean;
  /** Total durasi tes yang dialokasikan (detik) */
  durationTotal: number;
  /** Sisa waktu saat tes selesai (detik) */
  timeLeft: number;
  /** Durasi yang benar-benar dipakai user (detik) = durationTotal - timeLeft */
  durationUsed: number;
}

interface QuizScreenProps {
  nama: string;
  questions: Question[];
  durationSeconds: number;
  onFinish: (data: QuizFinishData) => void;
  saving: boolean;
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function QuizScreen({
  nama,
  questions,
  durationSeconds,
  onFinish,
  saving,
}: QuizScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [showConfirm, setShowConfirm] = useState(false);
  const finishedRef = useRef(false);

  const currentQuestion = questions[currentIdx];
  const total = questions.length;
  const answeredCount = Object.values(answers).filter((a) => a && a.length > 0).length;
  const progress = (answeredCount / total) * 100;

  // Timer
  useEffect(() => {
    if (finishedRef.current) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto submit ketika waktu habis
  useEffect(() => {
    if (timeLeft === 0 && !finishedRef.current) {
      finishedRef.current = true;
      const list: AnsweredQuestion[] = questions.map((q) => ({
        questionId: q.id,
        userAnswer: answers[q.id] || "",
      }));
      onFinish({
        answers: list,
        timeUp: true,
        durationTotal: durationSeconds,
        timeLeft: 0,
        durationUsed: durationSeconds,
      });
    }
  }, [timeLeft, answers, questions, onFinish, durationSeconds]);

  const handleSelect = (option: "A" | "B" | "C" | "D") => {
    if (finishedRef.current) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx((p) => p + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((p) => p - 1);
    }
  };

  const handleSubmit = () => {
    if (finishedRef.current) return;
    // Tampilkan dialog konfirmasi, belum benar-benar submit
    setShowConfirm(true);
  };

  const handleConfirmSubmit = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setShowConfirm(false);
    const list: AnsweredQuestion[] = questions.map((q) => ({
      questionId: q.id,
      userAnswer: answers[q.id] || "",
    }));
    onFinish({
      answers: list,
      timeUp: false,
      durationTotal: durationSeconds,
      timeLeft,
      durationUsed: Math.max(0, durationSeconds - timeLeft),
    });
  };

  const handleCancelSubmit = () => {
    setShowConfirm(false);
  };

  // Tutup dialog dengan tombol Escape
  useEffect(() => {
    if (!showConfirm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) {
        setShowConfirm(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showConfirm, saving]);

  // Tentukan warna timer
  const timePercent = (timeLeft / durationSeconds) * 100;
  const timerColor =
    timePercent > 50
      ? "text-blue-700"
      : timePercent > 20
      ? "text-amber-600"
      : "text-red-600";
  const timerBg =
    timePercent > 50
      ? "bg-blue-50 border-blue-200"
      : timePercent > 20
      ? "bg-amber-50 border-amber-200"
      : "bg-red-50 border-red-200";

  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 animate-fade-in">
      {/* Top bar */}
      <div className="bg-white rounded-2xl shadow-lg shadow-blue-900/10 p-3 sm:p-4 mb-3 sm:mb-4 border border-blue-100">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
              {nama.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-blue-900 truncate">{nama}</p>
              <p className="text-[10px] sm:text-xs text-blue-600">
                Soal {currentIdx + 1} / {total}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-2 ${timerBg}`}>
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${timerColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className={`font-bold text-sm sm:text-base tabular-nums ${timerColor}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 sm:h-2 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] sm:text-xs text-blue-600 mt-1.5">
          {answeredCount} dari {total} soal terjawab
        </p>
      </div>

      {/* Question card */}
      <div key={currentIdx} className="animate-slide-in bg-white rounded-2xl shadow-lg shadow-blue-900/10 p-4 sm:p-6 mb-3 sm:mb-4 border border-blue-100">
        <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm sm:text-base">
            {currentIdx + 1}
          </div>
          <p className="text-base sm:text-lg font-semibold text-blue-900 leading-relaxed flex-1 pt-1">
            {currentQuestion.soal}
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {(["A", "B", "C", "D"] as const).map((opt) => {
            const text = (currentQuestion as any)[`pilihan_${opt.toLowerCase()}`];
            const isSelected = currentAnswer === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                disabled={saving}
                className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all active:scale-[0.99] ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-500/20"
                    : "border-blue-100 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                } ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {opt}
                  </div>
                  <span className={`text-sm sm:text-base leading-snug ${isSelected ? "text-blue-900 font-medium" : "text-blue-800"}`}>
                    {text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIdx === 0 || saving}
          className="py-3 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm sm:text-base hover:bg-blue-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="hidden sm:inline">Sebelumnya</span>
          </span>
        </button>

        {currentIdx < total - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={saving}
            className="col-span-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm sm:text-base shadow-md shadow-blue-500/30 active:scale-95 disabled:opacity-50 transition-all"
          >
            <span className="inline-flex items-center gap-1">
              Selanjutnya
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="col-span-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/30 active:scale-95 disabled:opacity-50 transition-all"
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Mengirim...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                Kirim Jawaban
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </span>
            )}
          </button>
        )}
      </div>

      {/* Question navigator */}
      <div className="mt-4 sm:mt-5 bg-white rounded-2xl shadow-md shadow-blue-900/5 p-3 sm:p-4 border border-blue-100">
        <p className="text-xs font-semibold text-blue-700 mb-2">Navigasi Soal</p>
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                disabled={saving}
                className={`aspect-square rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1"
                    : isAnswered
                    ? "bg-blue-100 text-blue-700"
                    : "bg-white border-2 border-blue-200 text-blue-400"
                } ${saving ? "opacity-50 cursor-not-allowed" : "active:scale-90"}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Konfirmasi dialog sebelum submit */}
      <ConfirmDialog
        open={showConfirm}
        totalSoal={total}
        answeredCount={answeredCount}
        unansweredCount={total - answeredCount}
        timeLeft={timeLeft}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
        saving={saving}
      />
    </div>
  );
}
