import React, { useEffect, useState } from 'react';
import styles from './DifficultySelector.module.css';
import '../../App.css';
import { api } from '../../service/api';
import type { Difficulty, Question } from '../../typings';

type Props = {
  onStart: (difficulty: string, questions: Question[]) => void;
};

const DifficultySelector: React.FC<Props> = ({ onStart }) => {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    api
      .getDifficulties()
      .then(setDifficulties)
      .catch(() => {
        setDifficulties([
          { id: 'easy', name: 'Easy' },
          { id: 'medium', name: 'Medium' },
          { id: 'hard', name: 'Hard' },
          { id: 'extreme', name: 'Extreme' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const startFlow = () => {
    if (!selected) return;

    setQuestions(null);
    setFetchError(false);
    setIsStarting(true);

    setCountdown(3);

    api
      .getQuestions(selected)
      .then((qs) => {
        setQuestions(qs);
      })
      .catch((err) => {
        console.error('Error fetching questions:', err);
        setFetchError(true);
        setIsStarting(false);
      });

    let t = 3;
    const timer = setInterval(() => {
      t--;
      setCountdown(t);
      if (t === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  useEffect(() => {
    if (countdown === 0 && questions && questions.length > 0 && selected && isStarting) {
      setTimeout(() => {
        onStart(selected, questions);
      }, 50);
    }
  }, [countdown, questions, selected, isStarting]);

  if (countdown !== null && countdown > 0) {
    return (
      <div className={styles.countdownOverlay}>
        <div className={styles.countdownNumber}>{countdown}</div>
      </div>
    );
  }

  if (countdown === 0 && !questions && !fetchError && isStarting) {
    return (
      <div className={styles.loadingOverlay}>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.container}>
        <h2>Error loading questions</h2>
        <button
          className="btn"
          onClick={() => {
            setCountdown(null);
            setFetchError(false);
            setIsStarting(false);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Choose the difficulty</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.options}>
            {difficulties.map((d) => (
              <button
                key={d.id}
                className={`${styles.option} ${selected === d.id ? styles.active : ''}`}
                onClick={() => setSelected(d.id)}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <button className="btn" disabled={!selected} onClick={startFlow}>
              Start
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DifficultySelector;
