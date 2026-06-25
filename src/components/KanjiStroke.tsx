import { useState } from "react";
import { STROKE_ORDER_DATA } from "../data/kanji";
import TopBar from "./TopBar";

interface Props {
  onBack: () => void;
}

export default function KanjiStroke({ onBack }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Record<string, number>>({});

  return (
    <div className="pb-8">
      <TopBar title="書 Urutan Penulisan" subtitle="Belajar menulis kanji stroke demi stroke" onBack={onBack} />
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
        {STROKE_ORDER_DATA.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const step = currentStep[item.id] ?? 0;
          return (
            <div
              key={item.id}
              className={`
                animate-fade-in stagger-${Math.min(idx + 1, 5)}
                bg-white rounded-2xl shadow-md border border-blue-100
                overflow-hidden transition-all
              `}
            >
              <button
                type="button"
                onClick={() => {
                  setExpandedId(isExpanded ? null : item.id);
                  if (!isExpanded) setCurrentStep((p) => ({ ...p, [item.id]: 0 }));
                }}
                className="w-full text-left px-4 py-4 flex items-center gap-4 active:bg-blue-50/50 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 border-2 border-sky-200 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-sky-800 jp-text">
                    {item.kanji}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-bold text-blue-900">
                    {item.kanji} — {item.meaning}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-semibold">
                      {item.level}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                      {item.strokes} stroke
                    </span>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isExpanded && (
                <div className="animate-slide-in-up px-4 pb-4 pt-0 space-y-4">
                  <div className="h-px bg-blue-100" />

                  {/* Stroke Step Counter */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 bg-sky-50 rounded-full px-4 py-2 border border-sky-200">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentStep((p) => ({ ...p, [item.id]: Math.max(0, step - 1) }));
                        }}
                        disabled={step === 0}
                        className="w-8 h-8 rounded-full bg-white border border-sky-300 text-sky-700 font-bold text-lg flex items-center justify-center disabled:opacity-30 active:scale-90 transition-all"
                      >
                        −
                      </button>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-sky-600 font-medium">Stroke ke-</p>
                        <p className="text-xl font-bold text-sky-800 tabular-nums">
                          {step} / {item.strokes}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentStep((p) => ({ ...p, [item.id]: Math.min(item.strokes, step + 1) }));
                        }}
                        disabled={step >= item.strokes}
                        className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-lg flex items-center justify-center disabled:opacity-30 active:scale-90 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stroke Descriptions */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-blue-700">🖊️ Langkah Penulisan</p>
                    {item.stroke_descriptions.map((desc, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all ${
                          i < step
                            ? "bg-sky-50 border-sky-200"
                            : i === step
                            ? "bg-sky-100 border-sky-300 animate-glow"
                            : "bg-gray-50 border-gray-200 opacity-50"
                        }`}
                      >
                        <div className={`
                          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                          ${i < step ? "bg-sky-500 text-white" : i === step ? "bg-sky-600 text-white" : "bg-gray-300 text-gray-600"}
                        `}>
                          {i + 1}
                        </div>
                        <p className={`text-sm ${i <= step ? "text-sky-800" : "text-gray-500"}`}>
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Mnemonic */}
                  <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                    <p className="text-xs font-semibold text-amber-700 mb-1">💡 Mnemonic (Cara Mengingat)</p>
                    <p className="text-sm text-amber-800 italic">{item.mnemonics}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
