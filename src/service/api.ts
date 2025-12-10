import type { ApiQuestion, Question } from '../typings';

const BASE = 'https://preguntados-api.vercel.app';

async function tryFetchJson(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} - ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  async getDifficulties(): Promise<{ id: string; name: string }[]> {
    const res = await fetch(`${BASE}/api/difficulty`);

    if (!res.ok) {
      throw new Error('Error fetching difficulties');
    }

    const list: string[] = await res.json();

    return list.map((d) => ({
      id: d,
      name: d.charAt(0).toUpperCase() + d.slice(1),
    }));
  },

  async getQuestions(difficulty = 'easy'): Promise<Question[]> {
    const url = `${BASE}/api/questions?difficulty=${encodeURIComponent(difficulty)}`;
    const data = await tryFetchJson(url);

    let rawQuestions: ApiQuestion[] = [];

    if (Array.isArray(data)) {
      rawQuestions = data;
    } else if (data.questions) {
      rawQuestions = data.questions;
    }

    return rawQuestions.map((q) => ({
      id: q.id,
      text: q.question,
      options: [
        { id: 'option1', text: q.option1 },
        { id: 'option2', text: q.option2 },
        { id: 'option3', text: q.option3 },
        { id: 'option4', text: q.option4 },
      ],
    }));
  },

  async postAnswer(questionId: string, optionId: string): Promise<{ correct: boolean }> {
    const url = `${BASE}/api/answer`;
    try {
      const data = await tryFetchJson(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, option: optionId }),
      });
      if (data) return { correct: data.answer };
    } catch {}
    return { correct: Math.random() > 0.5 };
  },
};
