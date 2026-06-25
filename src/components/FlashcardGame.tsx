import { useCallback, useEffect, useMemo, useState } from "react";
import { VOCAB_DATA } from "../data/vocabulary";
import { JUKUGO_DATA } from "../data/kanji";
import TopBar from "./TopBar";

interface Props {
  onBack: () => void;
}

type PoolItem = {
  display: string;
  displaySub: string;
  answer: string;
  source: string;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(): PoolItem[] {
  const pool: PoolItem[] = [];

  // Vocabulary items
  for (const cat of VOCAB_DATA) {
    for (const item of cat.items) {
      pool.push({
        display: item.kanji,
        displaySub: item.furigana,
        answer: item.meaning,
        source: cat.name,
      });
    }
  }

  // Kanji items
  for (const item of JUKUGO_DATA) {
    pool.push({
      display: item.kanji,
      displaySub: `${item.onyomi} / ${item.kunyomi}`,
      answer: item.meaning,
      source: "Kanji",
    });
  }

  return pool;
}

export default function FlashcardGame({ onBack }: Props) {
  const pool = useMemo(() => buildPool(), []);
  const [round, setRound] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentCard, setCurrentCard] = useState<PoolItem | null>(null);

  const generateRound = useCallback(() => {
    if (pool.length < 10) return;

    // Pick random card
    const cardIdx = Math.floor(Math.random() * pool.length);
    const card = pool[cardIdx];

    // Get 8 wrong answers
    const wrongPool = pool
      .filter((_, i) => i !== cardIdx)
      .map((p) => p.answer);
    const shuffledWrong = shuffleArray(wrongPool).slice(0, 8);

    // Combine with correct answer and shuffle
    const allOptions = shuffleArray([...shuffledWrong, card.answer]);

    setCurrentCard(card);
    setCorrectAnswer(card.answer);
    setOptions(allOptions);
    setSelected(null);
    setShowResult(false);
  }, [pool]);

  useEffect(() => {
    generateRound();
  }, [generateRound]);

  const handleSelect = (option: string) => {
    if (selected) return; // Already answered
    setSelected(option);
    setShowResult(true);
    setTotalQ((p) => p + 1);
    if (option === correctAnswer) {
      setScore((p) => p + 1);
    }
  };

  const handleNext = () => {
    setRound((p) => p + 1);
    generateRound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!currentCard) {
    return (
      <div>
        <TopBar title="🃏 Flashcard" onBack={onBack} />
        <div className="max-w-2xl mx-auto px-4 pt-10 text-center">
          <p className="text-blue-700">Memuat data...</p>
        </div>
      </div>
    );
  }

  const isCorrect = selected === correctAnswer;

  return (
    <div className="pb-8">
      <TopBar title="🃏 Flashcard" subtitle="Cocokkan dengan arti yang benar" onBack={onBack} />

      {/* Score bar */}
      <div className="max-w-2xl mx-auto px-4 pt-3">
        <div className="bg-white rounded-xl shadow-md p-3 border border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span className="text-sm font-bold text-blue-900 tabular-nums">{score}</span>
          </div>
          <span className="text-xs text-blue-600 font-medium">
            Soal {totalQ + (showResult ? 0 : 1)}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-blue-900 tabular-nums">
              {totalQ > 0 ? Math.round((score / totalQ) * 100) : 0}%
            </span>
            <span className="text-lg">📊</span>
          </div>
        </div>
      </div>

      {/* Card Display */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="animate-pop-in bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-6 sm:p-8 text-center">
          <p className="text-xs text-blue-500 mb-2 font-medium">{currentCard.source}</p>
          <p className="kanji-big text-blue-900 mb-2 jp-text">
            {currentCard.display}
          </p>
          <p className="text-base sm:text-lg text-blue-600 jp-text">
            {currentCard.displaySub}
          </p>

          {/* Result feedback */}
          {showResult && (
            <div className={`mt-4 pt-4 border-t ${isCorrect ? "border-green-200" : "border-red-200"}`}>
              {isCorrect ? (
                <div className="animate-bounce-in">
                  <p className="text-3xl mb-1">🎉</p>
                  <p className="text-green-700 font-bold text-lg">Benar!</p>
                </div>
              ) : (
                <div className="animate-shake">
                  <p className="text-3xl mb-1">😅</p>
                  <p className="text-red-600 font-bold">Salah!</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Jawaban: <span className="font-bold">{correctAnswer}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3x3 Grid Options */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {options.map((option, idx) => {
            let btnClass = "bg-white border-blue-200 text-blue-900 hover:border-blue-400 hover:bg-blue-50 active:scale-95";

            if (showResult) {
              if (option === correctAnswer) {
                btnClass = "bg-green-100 border-green-400 text-green-800 animate-bounce-in";
              } else if (option === selected && !isCorrect) {
                btnClass = "bg-red-100 border-red-400 text-red-800 animate-shake";
              } else {
                btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
              }
            }

            return (
              <button
                key={`${round}-${idx}`}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={!!selected}
                className={`
                  p-3 sm:p-4 rounded-xl border-2 font-medium text-xs sm:text-sm
                  transition-all min-h-[60px] flex items-center justify-center text-center
                  leading-snug ${btnClass}
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next button */}
      {showResult && (
        <div className="max-w-2xl mx-auto px-4 pt-4">
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
          >
            <span className="inline-flex items-center gap-2">
              Soal Berikutnya
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
