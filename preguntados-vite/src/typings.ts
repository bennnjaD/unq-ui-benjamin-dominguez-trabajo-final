export type Difficulty = {
  id: string;
  name: string;
};

export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};
export type ApiQuestion = {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
};
