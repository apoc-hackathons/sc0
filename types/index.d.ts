declare global {
  type Question = {
    _id: String;
    question: String;
    answers: String[];
    correctAns: number;
  };
}

export {};
