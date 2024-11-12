type MBTIType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

type AnswerType =
  | '매우 아니다'
  | '아니다'
  | '보통이다'
  | '그렇다'
  | '매우 그렇다'

type UserAnswer = AnswerType[]

interface Question {
  disagree: MBTIType
  agree: MBTIType
  text: string
}

interface MBTIScore {
  E: number
  I: number
  S: number
  N: number
  T: number
  F: number
  J: number
  P: number
}

const questions: Question[] = [
  {
    disagree: 'E',
    agree: 'I',
    text: `다이어트는 주변인의 시선보다는 자기만족을 위해 하는 거라고 생각한다.`,
  },
  {
    disagree: 'S',
    agree: 'N',
    text: `다이어트에 성공한 미래의 내 모습을 상상해보면 동기부여가 된다.`,
  },
  {
    disagree: 'T',
    agree: 'F',
    text: `살쪘다고 고민하는 친구들을 보면 나만 그런 게 아니구나 싶어 위로가 된다.`,
  },
  {
    disagree: 'J',
    agree: 'P',
    text: `다이어트 방법을 고를 때 선택지가 다양한 편이 좋다.`,
  },
  {
    disagree: 'E',
    agree: 'I',
    text: `사람이 붐비는 맛집에 가는 것보다 집에서 배달 음식을 시켜먹는 게 좋다.`,
  },
  {
    disagree: 'S',
    agree: 'N',
    text: `다이어트를 할 때 세세한 식단 계획은 별로 중요하지 않다고 생각한다.`,
  },
  {
    disagree: 'T',
    agree: 'F',
    text: `다이어트 중이지만 지인이 음식을 권하면 미안한 마음에 거절하기가 어렵다.`,
  },
  {
    disagree: 'J',
    agree: 'P',
    text: `그때그때 즉흥적으로 끌리는 메뉴를 선택해서 식사하는 게 좋다.`,
  },
]

// 아래에 코드를 작성해주세요. 사용자의 응답은 임의의 형태로 상수로 작성해주세요.

const SCORE_MAP: Record<AnswerType, number> = {
  '매우 아니다': -2,
  아니다: -1,
  보통이다: 0,
  그렇다: 1,
  '매우 그렇다': 2,
}

const initialScore: MBTIScore = {
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
}

const updateScore = (
  score: MBTIScore,
  question: Question,
  answer: AnswerType
) => {
  const currentScore = SCORE_MAP[answer]

  if (currentScore === 0) return score

  const scoreType = currentScore > 0 ? question.agree : question.disagree

  return {
    ...score,
    [scoreType]: score[scoreType] + Math.abs(currentScore),
  }
}

const getMBTIFromScore = (score: MBTIScore) => {
  const MBTI = [
    score.E >= score.I ? 'E' : 'I',
    score.S > score.N ? 'S' : 'N',
    score.T >= score.F ? 'T' : 'F',
    score.J >= score.P ? 'J' : 'P',
  ].join('')

  return MBTI
}

const calculateMBTI = (answers: UserAnswer) => {
  if (answers.length != questions.length) {
    throw new Error('답변 수와 문항 수가 일치하지 않습니다.')
  }

  const score = answers.reduce(
    (accScores, answer, index) =>
      updateScore(accScores, questions[index], answer),
    initialScore
  )

  const result = getMBTIFromScore(score)
  return result
}

const testESTP: UserAnswer = [
  '매우 아니다', // E: 2
  '아니다', // S: 1
  '보통이다', // 0
  '그렇다', // P: 1
  '매우 그렇다', // I: 2
  '매우 아니다', // S: 2
  '아니다', // T: 1
  '보통이다', // 0
]
const testENFP: UserAnswer = [
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
]
const testESTJ: UserAnswer = [
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
]
const testINFP: UserAnswer = [
  '매우 그렇다',
  '매우 그렇다',
  '매우 그렇다',
  '매우 그렇다',
  '매우 그렇다',
  '매우 그렇다',
  '매우 그렇다',
  '매우 그렇다',
]

console.log(`ENFP: ${calculateMBTI(testENFP)}`)
console.log(`ESTJ: ${calculateMBTI(testESTJ)}`)
console.log(`INFP: ${calculateMBTI(testINFP)}`)
console.log(`ESTP: ${calculateMBTI(testESTP)}`)
