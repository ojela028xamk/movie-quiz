import { nanoid } from 'nanoid'

export type TestQuestion = {
  question_id: string
  question: string
  answers: TestAnswer[]
}

export type TestAnswer = {
  answer_id: string
  answer: string
  isCorrect: boolean
}

export const testQuestions: TestQuestion[] = [
  {
    question_id: nanoid(),
    question: 'Question 1',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 2',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 3',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 4',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 5',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 6',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 7',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 8',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 9',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 10',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
]
