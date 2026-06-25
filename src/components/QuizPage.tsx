import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { VOCAB_DATA } from "../data/vocabulary";
import { GRAMMAR_DATA } from "../data/grammar";
import { JUKUGO_DATA } from "../data/kanji";
import TopBar from "./TopBar";

interface Props {
  onBack: () => void;
}

type QuizMode = "menu" | "playing" | "result";

type QuizQuestion = {
  question: string;
  questionSub: string;
  correctAnswer: string;
  options: string[];
  category: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(count: number): QuizQuestion[] {
  const pool: { q: string; qSub: string; a: string; cat: string }[] = [];

  // From vocabulary
  for (const cat of VOCAB_DATA) {
    for (const item of cat.items) {
      pool.push({
        q: item.kanji,
        qSub: item.furigana,
        a: item.meaning,
        cat: cat.name,
      });
    }
  }

  // From kanji
  for (const item of JUKUGO_DATA) {
    pool.push({
      q: item.kanji,
      qSub: `音: ${item.onyomi} / 訓: ${item.kunyomi}`,
      a: item.meaning,
      cat: "Kanji",
    });
  }

  // From grammar (reverse: show meaning, pick pattern)
  for (const level of GRAMMAR_DATA) {
    for (const item of level.items) {
      pool.push({
        q: item.meaning,
        qSub: `(${level.level})`,
        a: item.pattern,
        cat: `Tatabahasa ${level.level}`,
      });
    }
  }

  if (pool.length < 5) return [];

  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((item) => {
    // Get 3 wrong answers
    const wrongPool = shuffle(pool.filter((p) => p.a !== item.a));
    const wrongAnswers = wrongPool.slice(0, 3).map((p) => p.a);
    const options = shuffle([item.a, ...wrongAnswers]);

    return {
      question: item.q,
      questionSub: item.qSub,
      correctAnswer: item.a,
      options,
      category: item.cat,
    };
  });
}

const TIMER_SECONDS = 15;

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export default function QuizPage({ onBack }: Props) {
  const [mode, setMode] = useState<QuizMode>("menu");
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startQuiz = useCallback(() => {
    const qs = buildQuestions(questionCount);
    if (qs.length === 0) return;
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setTotalTime(qs.length * TIMER_SECONDS);
    setTimeLeft(qs.length * TIMER_SECONDS);
    setMode("playing");
  }, [questionCount]);

  // Timer
  useEffect(() => {
    if (mode !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  // Time up
  useEffect(() => {
    if (timeLeft === 0 && mode === "playing") {
      setMode("result");
    }
  }, [timeLeft, mode]);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === currentQuestion.correctAnswer) {
      setScore((p) => p + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((p) => p + 1);
      setSelected(null);
    } else {
      setMode("result");
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleRestart = () => {
    setMode("menu");
  };

  // ===== MENU SCREEN =====
  if (mode === "menu") {
    const totalPool = useMemo(() => {
      let count = 0;
      for (const cat of VOCAB_DATA) count += cat.items.length;
      count += JUKUGO_DATA.length;
      for (const level of GRAMMAR_DATA) count += level.items.length;
      return count;
    }, []);

    return (
      <div className="pb-8">
        <TopBar title="📝 Quiz" subtitle="Uji pengetahuan bahasa Jepangmu" onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 pt-5">
          <div className="animate-fade-in bg-white rounded-2xl shadow-xl border border-blue-100 p-5 sm:p-7">
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/30 mb-3">
                <span className="text-3xl">📝</span>
              </div>
              <h2 className="text-xl font-bold text-blue-900">Mulai Quiz</h2>
              <p className="text-xs text-blue-600 mt-1">
                Campuran kosakata, kanji & tatabahasa • {totalPool} soal tersedia
              </p>
            </div>

            {/* Question count selector */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-blue-900 mb-2">Jumlah Soal</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((n) => {
                  const disabled = n > totalPool;
                  const isActive = questionCount === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      disabled={disabled}
                      onClick={() => setQuestionCount(n)}
                      className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/40"
                          : disabled
                          ? "bg-blue-50 text-blue-300 cursor-not-allowed"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100 active:scale-95"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-xl p-3 mb-5 space-y-1.5 border border-blue-100">
              <div className="flex items-start gap-2">
                <span className="text-blue-500 text-xs mt-0.5">⏱</span>
                <p className="text-xs text-blue-800">Waktu: {TIMER_SECONDS} detik per soal</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 text-xs mt-0.5">🔀</span>
                <p className="text-xs text-blue-800">Soal diacak setiap kali</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 text-xs mt-0.5">🎯</span>
                <p className="text-xs text-blue-800">4 pilihan jawaban per soal</p>
              </div>
            </div>

            <button
              type="button"
              onClick={startQuiz}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              <span className="inline-flex items-center gap-2">
                Mulai Quiz
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== RESULT SCREEN =====
  if (mode === "result") {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const timeUsed = totalTime - timeLeft;

    return (
      <div className="pb-8">
        <TopBar title="📝 Hasil Quiz" onBack={onBack} />
        <div className="max-w-lg mx-auto px-4 pt-5">
          <div className="animate-fade-in bg-white rounded-2xl shadow-xl border border-blue-100 p-5 sm:p-7 text-center">
            <div className="animate-bounce-in mb-4">
              <p className="text-5xl mb-2">{percentage >= 80 ? "🏆" : percentage >= 60 ? "🌟" : percentage >= 40 ? "👍" : "📚"}</p>
              <h2 className="text-2xl font-bold text-blue-900">
                {percentage >= 80 ? "Luar Biasa!" : percentage >= 60 ? "Bagus!" : percentage >= 40 ? "Cukup Baik!" : "Terus Belajar!"}
              </h2>
            </div>

            <div className="text-6xl font-extrabold text-blue-700 my-4 tabular-nums">
              {percentage}%
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600">Benar</p>
                <p className="text-2xl font-bold text-blue-700 tabular-nums">{score}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600">Soal</p>
                <p className="text-2xl font-bold text-blue-700 tabular-nums">{questions.length}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600">Waktu</p>
                <p className="text-2xl font-bold text-blue-700 tabular-nums">{formatTime(timeUsed)}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRestart}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Ulangi Quiz
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== PLAYING SCREEN =====
  const isCorrect = selected === currentQuestion.correctAnswer;
  const timePercent = (timeLeft / totalTime) * 100;
  const timerColor = timePercent > 40 ? "text-blue-700" : timePercent > 15 ? "text-amber-600" : "text-red-600";
  const timerBg = timePercent > 40 ? "bg-blue-50 border-blue-200" : timePercent > 15 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  return (
    <div className="pb-8">
      <TopBar title="📝 Quiz" onBack={() => setMode("menu")} />

      <div className="max-w-2xl mx-auto px-4 pt-3">
        {/* Top info bar */}
        <div className="bg-white rounded-xl shadow-md p-3 border border-blue-100 flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-blue-700 tabular-nums">
            {currentIdx + 1} / {questions.length}
          </span>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border ${timerBg}`}>
            <svg className={`w-4 h-4 ${timerColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className={`text-sm font-bold tabular-nums ${timerColor}`}>{formatTime(timeLeft)}</span>
          </div>
          <span className="text-xs font-bold text-blue-700 tabular-nums">
            ✅ {score}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-blue-100 rounded-full overflow-hidden mb-4">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + (selected ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div key={currentIdx} className="animate-pop-in bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-5 sm:p-6 text-center mb-4">
          <p className="text-xs text-blue-500 mb-2 font-medium">{currentQuestion.category}</p>
          <p className="text-3xl sm:text-4xl font-bold text-blue-900 jp-text mb-1">
            {currentQuestion.question}
          </p>
          {currentQuestion.questionSub && (
            <p className="text-sm text-blue-600 jp-text">
              {currentQuestion.questionSub}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "bg-white border-blue-200 text-blue-900 hover:border-blue-400 hover:bg-blue-50 active:scale-[0.99]";

            if (selected) {
              if (option === currentQuestion.correctAnswer) {
                btnClass = "bg-green-100 border-green-400 text-green-800";
              } else if (option === selected && !isCorrect) {
                btnClass = "bg-red-100 border-red-400 text-red-800 animate-shake";
              } else {
                btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
              }
            }

            return (
              <button
                key={`${currentIdx}-${idx}`}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={!!selected}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${btnClass}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    selected
                      ? option === currentQuestion.correctAnswer
                        ? "bg-green-500 text-white"
                        : option === selected && !isCorrect
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-500"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm sm:text-base font-medium jp-text flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback & Next */}
        {selected && (
          <div className="mt-4 animate-slide-in-up">
            {isCorrect ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <p className="text-green-700 font-semibold text-sm">Benar! Bagus sekali!</p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3 flex items-center gap-2">
                <span className="text-xl">😅</span>
                <p className="text-red-700 text-sm">
                  <span className="font-semibold">Salah.</span> Jawaban: <span className="font-bold">{currentQuestion.correctAnswer}</span>
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              <span className="inline-flex items-center gap-2">
                {currentIdx < questions.length - 1 ? "Soal Berikutnya" : "Lihat Hasil"}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
