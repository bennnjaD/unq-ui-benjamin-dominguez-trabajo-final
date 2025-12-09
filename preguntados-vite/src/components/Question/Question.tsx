import React, { useState } from "react";
import type { Question as QType } from "../../typings";
import styles from "./Question.module.css";

type Props = {
  question: QType;
  onAnswer: (questionId: string, optionId: string) => Promise<boolean>;
};

const Question: React.FC<Props> = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleChoose = async (optId: string) => {
    if (disabled) return;
    setSelected(optId);
    setDisabled(true);
    try {
      const correct = await onAnswer(question.id, optId);
      setFeedback(correct ? "correct" : "wrong");
    } catch {
      setFeedback("wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionText}>{question.text}</div>

      <div className={styles.options}>
        {question.options.map((o) => {
          const isSelected = selected === o.id;
          const className = [
            styles.option,
            isSelected && feedback === "correct" ? styles.correct : "",
            isSelected && feedback === "wrong" ? styles.wrong : ""
          ].join(" ");
          return (
            <button
              key={o.id}
              className={className}
              onClick={() => handleChoose(o.id)}
              disabled={disabled}
            >
              {o.text}
            </button>
          );
        })}
      </div>

      {feedback === "correct" && <div className={styles.feedback}>✅ Correcto</div>}
      {feedback === "wrong" && <div className={styles.feedbackWrong}>❌ Incorrecto</div>}
    </div>
  );
};

export default Question;
