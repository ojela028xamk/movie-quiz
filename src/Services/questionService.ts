import { nanoid } from 'nanoid'
import {
  MovieCast,
  MovieCrew,
  MovieProductionCompanies,
  QuizQuestion,
} from '../globalTypes'
import {
  getWrongActors,
  getWrongCharacters,
  getWrongMovieBudgets,
  getWrongMovieCompanies,
} from './wrongAnswerService'
import { shuffleArray } from './quizService'

const askReleaseYear = (date: string): QuizQuestion => {
  const correctDate = Number(date.substring(0, 4))

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'What year was movie released?',
    answers: [
      {
        answer_id: nanoid(),
        answer: correctDate,
        isCorrect: true,
      },
    ],
  }

  let wrongYears = []
  for (let i = correctDate - 5; i <= correctDate + 5; i++) {
    if (i === correctDate) continue
    wrongYears.push(i)
  }
  wrongYears = shuffleArray(wrongYears)

  for (let index = 0; index < 3; index++) {
    const wrongDate = wrongYears[index]

    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: wrongDate,
      isCorrect: false,
    })
  }

  newQuestion.answers = shuffleArray(newQuestion.answers)

  return newQuestion
}

const askDirector = (movieCrew: MovieCrew[]): QuizQuestion => {
  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'Which one of them is part of the directing crew?',
    answers: [],
  }

  const director = movieCrew.find((member) => member.department === 'Directing')

  if (director) {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: director.name,
      isCorrect: true,
    })
  }

  for (let index = 0; index < movieCrew.length; index++) {
    const answerAlreadyExists = newQuestion.answers.findIndex(
      (answer) => answer.answer === movieCrew[index].name,
    )

    if (
      movieCrew[index].department !== 'Directing' &&
      answerAlreadyExists < 0
    ) {
      newQuestion.answers.push({
        answer_id: nanoid(),
        answer: movieCrew[index].name,
        isCorrect: false,
      })
    }

    if (newQuestion.answers.length === 4) break
  }

  newQuestion.answers = shuffleArray(newQuestion.answers)

  return newQuestion
}

const askProductionCompany = (
  movieCompanies: MovieProductionCompanies[],
): QuizQuestion => {
  const wrongCompanies = getWrongMovieCompanies(movieCompanies[0].name)

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'Which company is part of the production?',
    answers: [
      {
        answer_id: nanoid(),
        answer: movieCompanies[0].name,
        isCorrect: true,
      },
    ],
  }

  wrongCompanies.map((company) => {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: company,
      isCorrect: false,
    })
  })

  newQuestion.answers = shuffleArray(newQuestion.answers)

  return newQuestion
}

const askMovieBudget = (movieBudget: number): QuizQuestion => {
  const wrongBudgets = getWrongMovieBudgets(movieBudget)

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'What was the budget of this movie?',
    answers: [
      {
        answer_id: nanoid(),
        answer: Intl.NumberFormat().format(movieBudget) + ' $',
        isCorrect: true,
      },
    ],
  }

  wrongBudgets.map((budget) => {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: Intl.NumberFormat().format(budget) + ' $',
      isCorrect: false,
    })
  })

  newQuestion.answers = shuffleArray(newQuestion.answers)

  return newQuestion
}

const askActorPlaysCharacter = (
  cast: MovieCast[],
  randomIndex: number,
): QuizQuestion => {
  const randomActor = cast[randomIndex]
  const wrongActors = getWrongActors(cast, randomActor.name)

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: `Who plays the character '${randomActor.character}' ?`,
    answers: [
      {
        answer_id: nanoid(),
        answer: randomActor.name,
        isCorrect: true,
      },
    ],
  }

  wrongActors.map((actor) => {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: actor,
      isCorrect: false,
    })
  })

  newQuestion.answers = shuffleArray(newQuestion.answers)

  return newQuestion
}

const askCharacterIsActor = (
  cast: MovieCast[],
  randomIndex: number,
): QuizQuestion => {
  const randomCharacter = cast[randomIndex]
  const wrongCharacters = getWrongCharacters(cast, randomCharacter.character)

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: `Actor '${randomCharacter.name}' plays which character?`,
    answers: [
      {
        answer_id: nanoid(),
        answer: randomCharacter.character,
        isCorrect: true,
      },
    ],
  }

  wrongCharacters.map((character) => {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: character,
      isCorrect: false,
    })
  })

  newQuestion.answers = shuffleArray(newQuestion.answers)

  return newQuestion
}

export {
  askReleaseYear,
  askDirector,
  askProductionCompany,
  askMovieBudget,
  askActorPlaysCharacter,
  askCharacterIsActor,
}
