const getWrongMovieCompanies = (correctAnswer: string): string[] => {
  const wrongAnswers: string[] = []
  let count = 0

  const companiesList: string[] = [
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

export { getWrongMovieCompanies }
