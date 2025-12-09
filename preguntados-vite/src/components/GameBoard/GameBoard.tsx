import React, { useEffect, useState } from "react";
import type { Question as QType } from "../../typings";
import styles from "./GameBoard.module.css";
import { api } from "../../service/api";
import Question from "../Question/Question";

type Props = {
  difficulty: string;
  onFinish: (correct: number, total: number) => void;
  onAbort: () => void;
};

const GameBoard: React.FC<Props> = ({ difficulty, onFinish, onAbort }) => {
  const [questions, setQuestions] = useState<QType[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const qs = await api.getQuestions(difficulty);
        if (!mounted) return;
      
        const normalized = qs.map((q: any) => ({
          id: q.id ?? q.questionId ?? String(Math.random()),
          text: q.text ?? q.question ?? q.t,
          options: (q.options ?? q.choices ?? q.answers ?? []).map((o: any, i: number) =>
            typeof o === "string"
              ? { id: String(i), text: o }
              : { id: o.id ?? String(i), text: o.text ?? o.value ?? "" }
          )
        }));
        setQuestions(normalized);
      } catch (err) {
        console.error(err);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [difficulty]);

  const handleAnswer = async (questionId: string, optionId: string) => {
    const res = await api.postAnswer(questionId, optionId);
    if (res.correct) setCorrectCount((c) => c + 1);
    setTimeout(() => {
      if (index + 1 >= questions.length) {
        onFinish(correctCount + (res.correct ? 1 : 0), questions.length || 0);
      } else {
        setIndex((i) => i + 1);
      }
    }, 700);
    return res.correct;
  };

  if (loading) return <div className={styles.container}><p>Cargando preguntas...</p></div>;
  if (!questions.length) {
    return (
      <div className={styles.container}>
        <p>No se encontraron preguntas para la dificultad seleccionada.</p>
        <div className={styles.actions}>
          <button className="btn-ghost" onClick={onAbort}>Volver</button>
        </div>
      </div>
    );
  }

  const current = questions[index];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Pregunta {index + 1} / {questions.length}</div>
        <div>Aciertos: {correctCount}</div>
      </div>

      <Question question={current} onAnswer={handleAnswer} />

      <div className={styles.actions}>
        <button className="btn-ghost" onClick={() => onFinish(correctCount, questions.length)}>Terminar partida</button>
      </div>
    </div>
  );
};

export default GameBoard;
