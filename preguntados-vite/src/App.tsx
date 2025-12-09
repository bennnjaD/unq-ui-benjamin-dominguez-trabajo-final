import { useState } from "react";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import GameBoard from "./components/GameBoard/GameBoard";
import Results from "./components/Results/Results";
import "./App.css";

type Phase = "select" | "playing" | "results";

function App() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("select");
  const [lastScore, setLastScore] = useState<{ correct: number; total: number } | null>(null);

  const startPlaying = (diff: string) => {
    setDifficulty(diff);
    setPhase("playing");
  };

  const finishGame = (correct: number, total: number) => {
    setLastScore({ correct, total });
    setPhase("results");
  };

  const playAgain = () => {
    setPhase("select");
    setDifficulty(null);
    setLastScore(null);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Preguntados</h1>
        <p className="muted">Seleccioná una dificultad y responde las preguntas una por una.</p>
      </div>

      <div className="card">
        {phase === "select" && <DifficultySelector onStart={startPlaying} />}
        {phase === "playing" && difficulty && (
          <GameBoard difficulty={difficulty} onFinish={finishGame} onAbort={() => setPhase("select")} />
        )}
        {phase === "results" && lastScore && (
          <Results score={lastScore} onPlayAgain={playAgain} />
        )}
      </div>

    </div>
  );
}

export default App;
