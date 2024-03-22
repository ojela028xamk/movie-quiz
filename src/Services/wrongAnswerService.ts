import { MovieCast } from '../globalTypes'

const getWrongMovieCompanies = (correctAnswer: string): string[] => {
  const wrongAnswers: string[] = []
  let count = 0

  const companiesList = [
    'Miramax',
    'Columbia Pictures',
    '87Eleven',
    'Paramount',
    'A24',
    '20th Century Fox',
    'LuckyChap Entertainment',
    'Carolco Pictures',
    'MP Munich Pape Filmproductions',
    'Gracie Films',
    'Legendary Pictures',
    'Parkes/MacDonald Productions',
    'Lionsgate',
    'Twisted Pictures',
    'Syncopy',
    'Pixar',
    'Pacific Data Images',
    'Universal Pictures',
    'Zanuck/Brown Productions',
    'Brad Grey Pictures',
  ]

  while (count < 3) {
    const randomAnswer =
      companiesList[Math.floor(Math.random() * companiesList.length)]
    if (
      !wrongAnswers.some((answer) => answer === randomAnswer) &&
      correctAnswer !== randomAnswer
    ) {
      wrongAnswers.push(randomAnswer)
      count++
    }
  }

  return wrongAnswers
}

const getWrongMovieBudgets = (budget: number): number[] => {
  let count = 0
  const wrongAnswers: number[] = []

  while (count < 3) {
    const wrongBudget = Math.floor(Math.random() * budget)
    const length = wrongBudget.toString().length
    let start = '1'

    while (start.length < length) {
      start = start + '0'
    }

    const roundedWrongBudget =
      Math.round(wrongBudget / Number(start)) * Number(start)

    if (
      !wrongAnswers.some((answer) => answer === roundedWrongBudget) &&
      budget !== roundedWrongBudget
    ) {
      wrongAnswers.push(roundedWrongBudget)
      count++
    }
  }

  return wrongAnswers
}

const getWrongActors = (cast: MovieCast[], correctAnswer: string): string[] => {
  const wrongAnswers: string[] = []
  const actorsList = cast.slice(0, 10).map((actor) => {
    return actor.name
  })
  let count = 0

  while (count < 3) {
    const randomAnswer =
      actorsList[Math.floor(Math.random() * actorsList.length)]
    if (
      !wrongAnswers.some((answer) => answer === randomAnswer) &&
      correctAnswer !== randomAnswer
    ) {
      wrongAnswers.push(randomAnswer)
      count++
    }
  }
  return wrongAnswers
}

export { getWrongMovieCompanies, getWrongMovieBudgets, getWrongActors }
