import React, { useState } from 'react';
import type { Question as QType } from '../../typings';
import styles from './GameBoard.module.css';
import { api } from '../../service/api';
import Question from '../Question/Question';

type Props = {
  questions: QType[];
  onFinish: (correct: number, total: number) => void;
};

const GameBoard: React.FC<Props> = ({ questions, onFinish }) => {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleAnswer = async (questionId: string, optionId: string) => {
    const res = await api.postAnswer(questionId, optionId);

    setCorrectCount((prev) => prev + (res.correct ? 1 : 0));

    setTimeout(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= questions.length) {
          onFinish(correctCount + (res.correct ? 1 : 0), questions.length);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 1000);

    return res.correct;
  };

  const current = questions[index];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          Question {index + 1} / {questions.length}
        </div>
        <div>Correct answers: {correctCount}</div>
      </div>

      <Question question={current} onAnswer={handleAnswer} />

      <div className={styles.actions}>
        <button className="btn-ghost" onClick={() => onFinish(correctCount, questions.length)}>
          End Game
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
