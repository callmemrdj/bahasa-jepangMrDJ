import { useState } from "react";
import Dashboard from "./components/Dashboard";
import GrammarSection from "./components/GrammarSection";
import GrammarDetail from "./components/GrammarDetail";
import VocabSection from "./components/VocabSection";
import VocabDetail from "./components/VocabDetail";
import KanjiSection from "./components/KanjiSection";
import KanjiJukugo from "./components/KanjiJukugo";
import KanjiStroke from "./components/KanjiStroke";
import FlashcardGame from "./components/FlashcardGame";
import QuizPage from "./components/QuizPage";

export type Page =
  | { name: "dashboard" }
  | { name: "grammar" }
  | { name: "grammar-detail"; level: string }
  | { name: "vocabulary" }
  | { name: "vocab-detail"; categoryId: string }
  | { name: "kanji" }
  | { name: "kanji-jukugo" }
  | { name: "kanji-stroke" }
  | { name: "flashcard" }
  | { name: "quiz" };

export default function App() {
  const [page, setPage] = useState<Page>({ name: "dashboard" });

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (page.name === "grammar-detail") {
      navigate({ name: "grammar" });
    } else if (page.name === "vocab-detail") {
      navigate({ name: "vocabulary" });
    } else if (page.name === "kanji-jukugo" || page.name === "kanji-stroke") {
      navigate({ name: "kanji" });
    } else {
      navigate({ name: "dashboard" });
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] w-full">
      {page.name === "dashboard" && (
        <Dashboard onNavigate={navigate} />
      )}
      {page.name === "grammar" && (
        <GrammarSection onNavigate={navigate} onBack={goBack} />
      )}
      {page.name === "grammar-detail" && (
        <GrammarDetail level={page.level} onBack={goBack} />
      )}
      {page.name === "vocabulary" && (
        <VocabSection onNavigate={navigate} onBack={goBack} />
      )}
      {page.name === "vocab-detail" && (
        <VocabDetail categoryId={page.categoryId} onBack={goBack} />
      )}
      {page.name === "kanji" && (
        <KanjiSection onNavigate={navigate} onBack={goBack} />
      )}
      {page.name === "kanji-jukugo" && (
        <KanjiJukugo onBack={goBack} />
      )}
      {page.name === "kanji-stroke" && (
        <KanjiStroke onBack={goBack} />
      )}
      {page.name === "flashcard" && (
        <FlashcardGame onBack={goBack} />
      )}
      {page.name === "quiz" && (
        <QuizPage onBack={goBack} />
      )}
    </div>
  );
}
