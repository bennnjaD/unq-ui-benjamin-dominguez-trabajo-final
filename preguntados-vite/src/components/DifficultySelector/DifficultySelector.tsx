import React, { useEffect, useState } from "react";
import styles from "./DifficultySelector.module.css";
import { api } from "../../service/api";

type Props = {
  onStart: (difficulty: string) => void;
};

const DifficultySelector: React.FC<Props> = ({ onStart }) => {
  const [difficulties, setDifficulties] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const ds = await api.getDifficulties();
        setDifficulties(ds);
        setSelected(ds[0]?.id ?? "easy");
      } catch {
        setDifficulties([
          { id: "easy", name: "Fácil" },
          { id: "medium", name: "Medio" },
          { id: "hard", name: "Difícil" }
        ]);
        setSelected("easy");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Elegí la dificultad</h2>
      {loading ? (
        <p>Cargando opciones...</p>
      ) : (
        <>
          <div className={styles.options}>
            {difficulties.map((d) => (
              <button
                key={d.id}
                className={`${styles.option} ${selected === d.id ? styles.active : ""}`}
                onClick={() => setSelected(d.id)}
                aria-pressed={selected === d.id}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              className="btn"
              onClick={() => selected && onStart(selected)}
            >
              Empezar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DifficultySelector;
