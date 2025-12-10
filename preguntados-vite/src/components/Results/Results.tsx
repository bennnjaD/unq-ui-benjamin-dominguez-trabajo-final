import React from 'react';
import styles from './Results.module.css';

type Props = {
  score: { correct: number; total: number };
  onPlayAgain: () => void;
};

const Results: React.FC<Props> = ({ score, onPlayAgain }) => {
  const { correct, total } = score;
  const percent = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className={styles.container}>
      <h2>Result</h2>
      <p className={styles.summary}>
        {correct} out of {total} correct answers
      </p>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${percent}%` }}>
          {percent}%
        </div>
      </div>
      <div className={styles.actions}>
        <button className="btn" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Results;
