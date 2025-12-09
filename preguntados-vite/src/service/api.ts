const BASE = "https://preguntados-api.vercel.app";

async function tryFetchJson(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} - ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  async getDifficulties(): Promise<{ id: string; name: string }[]> {
    // varios intentos por si cambia el endpoint
    const candidates = [
      `${BASE}/api/difficulty`,
      `${BASE}/api/difficulties`,
      `${BASE}/api/difficultyBrinda`,
      `${BASE}/api/difficultyBrinda/`,
      `${BASE}/api/dificultades`
    ];

    for (const c of candidates) {
      try {
        const json = await fetch(c);
        if (!json.ok) throw new Error();
        const data = await json.json();
        // asumimos que la API retorna un array de strings o {id,name}
        if (Array.isArray(data)) {
          // normalize
          return data.map((it: any) =>
            typeof it === "string" ? { id: it, name: it } : { id: it.id ?? it.name, name: it.name ?? it.id }
          );
        }
      } catch {
        // ignora y prueba siguiente
      }
    }
    // fallback estático si la API no responde como esperamos
    return [
      { id: "easy", name: "Fácil" },
      { id: "medium", name: "Medio" },
      { id: "hard", name: "Difícil" }
    ];
  },

  async getQuestions(difficulty = "easy"): Promise<any[]> {
    const url = `${BASE}/api/questions?difficulty=${encodeURIComponent(difficulty)}`;
    const data = await tryFetchJson(url);
    // suponemos que la API devuelve objeto con array o el array mismo
    if (Array.isArray(data)) return data;
    if (data.questions) return data.questions;
    return [];
  },

  async postAnswer(questionId: string, optionId: string): Promise<{ correct: boolean }> {
    const url = `${BASE}/api/answer`;
    try {
      const data = await tryFetchJson(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, option: optionId })
      });
      // suponemos que la API devuelve { correct: boolean }
      if (typeof data.correct === "boolean") return { correct: data.correct };
    } catch {
      // si falla el POST al endpoint, devolvemos respuesta local falsa para poder continuar
    }
    // fallback: respuesta "aleatoria" (no ideal pero permite jugar si la API no responde)
    return { correct: Math.random() > 0.5 };
  }
};
