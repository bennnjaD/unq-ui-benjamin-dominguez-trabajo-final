import { useState } from 'react';
import DifficultySelector from './components/DifficultySelector/DifficultySelector';
import GameBoard from './components/GameBoard/GameBoard';
import Results from './components/Results/Results';
import './App.css';
import type { Question } from './typings';

type Phase = 'select' | 'playing' | 'results';

function App() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('select');
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [lastScore, setLastScore] = useState<{ correct: number; total: number } | null>(null);

  const startPlaying = (difficulty: string, qs: Question[]) => {
    setDifficulty(difficulty);
    setQuestions(qs);
    setPhase('playing');
  };

  const finishGame = (correct: number, total: number) => {
    setLastScore({ correct, total });
    setPhase('results');
  };

  const playAgain = () => {
    setPhase('select');
    setDifficulty(null);
    setQuestions(null);
    setLastScore(null);
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Preguntados</h1>
        {phase === 'select' && <p className="subtitle">Select a difficulty to start playing</p>}
      </div>

      <div className="card">
        {phase === 'select' && <DifficultySelector onStart={startPlaying} />}

        {phase === 'playing' && difficulty && questions && <GameBoard questions={questions} onFinish={finishGame} />}

        {phase === 'results' && lastScore && <Results score={lastScore} onPlayAgain={playAgain} />}
      </div>
    </div>
  );
}

export default App;
