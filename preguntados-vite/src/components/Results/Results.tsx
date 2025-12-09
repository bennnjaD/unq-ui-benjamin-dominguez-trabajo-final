import React from "react";
import styles from "./Results.module.css";

type Props = {
  score: { correct: number; total: number };
  onPlayAgain: () => void;
};

const Results: React.FC<Props> = ({ score, onPlayAgain }) => {
  const { correct, total } = score;
  const percent = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className={styles.container}>
      <h2>Resultado</h2>
      <p className={styles.summary}>{correct} de {total} respuestas correctas</p>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${percent}%` }}>{percent}%</div>
      </div>
      <div className={styles.actions}>
        <button className="btn" onClick={onPlayAgain}>Jugar otra vez</button>
      </div>
    </div>
  );
};

export default Results;
