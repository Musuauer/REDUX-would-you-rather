export let users = {
  angelamerkel: {
    id: 'angelamerkel',
    name: 'Angela Merkel',
    avatarURL: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=Default&mouthType=Serious&skinColor=Yellow',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      'am8ehyc8byjqgar0jgpub9': 'optionTwo',
      'loxhs1bqm25b708cmbf3g': 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  donaldtrump: {
    id: 'donaldtrump',
    name: 'Donald Trump',
    avatarURL: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerShirt&clotheColor=Gray01&eyeType=Squint&eyebrowType=Angry&mouthType=ScreamOpen&skinColor=Tanned',
    answers: {
      'vthrdm985a262al8qx3do': 'optionOne',
      'xj352vofupe1dqz9emx13r': 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  vladimirputin: {
    id: 'vladimirputin',
    name: 'Vladimir Putin',
    avatarURL: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=EyeRoll&eyebrowType=Default&mouthType=Smile&skinColor=Pale',
    answers: {
      'xj352vofupe1dqz9emx13r': 'optionOne',
      'vthrdm985a262al8qx3do': 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  }
}

export let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'angelamerkel',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['angelamerkel'],
      text: 'marry someone that you don’t love'
    },
    optionTwo: {
      votes: [],
      text: 'marry someone that doesn’t love you'
    }
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'vladimirputin',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'watch your parents having sex'
    },
    optionTwo: {
      votes: ['vladimirputin', 'angelamerkel'],
      text: 'be watched having sex by your parents'
    }
  },
  'am8ehyc8byjqgar0jgpub9': {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'angelamerkel',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'know how you are going to die'
    },
    optionTwo: {
      votes: ['angelamerkel'],
      text: 'when you are going to die'
    }
  },
  'loxhs1bqm25b708cmbf3g': {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'donaldtrump',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'always wear winter clothes in summer '
    },
    optionTwo: {
      votes: ['angelamerkel'],
      text: 'always wear summer clothes in winter'
    }
  },
  'vthrdm985a262al8qx3do': {
    id: 'vthrdm985a262al8qx3do',
    author: 'donaldtrump',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['donaldtrump'],
      text: 'have out of control body hair'
    },
    optionTwo: {
      votes: ['vladimirputin'],
      text: 'have out of control body odor'
    }
  },
  'xj352vofupe1dqz9emx13r': {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'vladimirputin',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['vladimirputin'],
      text: 'have edible spaghetti hair that regrows'
    },
    optionTwo: {
      votes: ['donaldtrump'],
      text: 'have maple syrup sweat'
    }
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((resolve, reject) => {
    const authedUser = question.author
    const formattedQuestion = formatQuestion(question)

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, id, answer }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [id]: answer
          }
        }
      }

      questions = {
        ...questions,
        [id]: {
          ...questions[id],
          [answer]: {
            ...questions[id][answer],
            votes: questions[id][answer].votes.concat([authedUser])
          }
        }
      }

      resolve()
    }, 500)
  })
}

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, questions, authedId = null]) => ({
    users,
    questions,
    authedId
  }))
}
