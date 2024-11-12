/**
 * MBTI를 계산해 콘솔에 출력하는 콘솔 프로그램을 작성해주세요.
 *
 * 아래 questions 배열은 MBTI를 계산하기 위한 문항들입니다.
 * 모든 문항에 대한 선택지는 다섯개로 동일하며 다음과 같습니다.
 *   매우 아니다, 아니다, 보통이다, 그렇다, 매우 그렇다
 *
 * 선택지에 따라 다음과 같이 점수를 부여합니다.
 *   매우 아니다는 disagree 타입에 2점
 *   아니다는 disagree 타입에 1점
 *   보통이다는 양쪽에 0점
 *   그렇다는 agree 타입에 1점
 *   매우 그렇다는 agree 타입에 2점
 *
 * 예를 들어 첫 번째 문항인 `다이어트는 주변인의 시선보다는 자기만족을 위해 하는 거라고 생각한다.`에
 * 매우 아니다라고 답하면 E 타입에 2점
 * 아니다라고 답하면 E 타입에 1점
 * 보통이다라고 답하면 양쪽에 0점
 * 그렇다라고 답하면 I 타입에 1점
 * 매우 그렇다라고 답하면 I 타입에 2점을 부여합니다.
 *
 * 자리가 같은 두 알파벳의 점수가 같은 경우 다음과 같이 처리합니다.
 *   E == I: E
 *   S == N: N
 *   F == T: F
 *   P == J: P
 * 따라서 모든 항목에 보통이다라고 답하면 결과는 ENFP가 됩니다.
 *
 * 입력값에 오류는 없다고 가정합니다.
 *
 * 필요하다면 questions 변수의 내용을 임의로 바꾸셔도 괜찮습니다.
 *
 * 언어는 자바스크립트나 타입스크립트 모두 무방합니다.
 */

type MBTIType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
type Answer = '매우 아니다' | '아니다' | '보통이다' | '그렇다' | '매우 그렇다'

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

type UserAnswers = Answer[]

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
const answerMapper = (answer: Answer) => {
  switch (answer) {
    case '매우 아니다':
      return -2
    case '아니다':
      return -1
    case '보통이다':
      return 0
    case '그렇다':
      return 1
    case '매우 그렇다':
      return 2
    default:
      throw new Error('잘못된 답변입니다.')
  }
}

const calculateMBTI = (answers: UserAnswers) => {
  if (answers.length != questions.length) {
    throw new Error('답변 수와 문항 수가 일치하지 않습니다.')
  }

  const scoreMap: MBTIScore = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  }

  questions.forEach((question, idx) => {
    const score = answerMapper(answers[idx])
    if (score > 0) {
      scoreMap[question.agree] += Math.abs(score)
    } else if (score < 0) {
      scoreMap[question.disagree] += Math.abs(score)
    }
  })

  const result = [
    scoreMap.E >= scoreMap.I ? 'E' : 'I',
    scoreMap.S > scoreMap.N ? 'S' : 'N',
    scoreMap.T >= scoreMap.F ? 'T' : 'F',
    scoreMap.J >= scoreMap.P ? 'J' : 'P',
  ].join('')

  return result
}

const testAnswer: UserAnswers = [
  '매우 아니다', // E: 2
  '아니다', // S: 1
  '보통이다', // 0
  '그렇다', // P: 1
  '매우 그렇다', // I: 2
  '매우 아니다', // S: 2
  '아니다', // T: 1
  '보통이다', // 0
]
const testENFP: UserAnswers = [
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
  '보통이다',
]
const testDisagree: UserAnswers = [
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
  '매우 아니다',
]
const testAgree: UserAnswers = [
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
console.log(`ESTJ: ${calculateMBTI(testDisagree)}`)
console.log(`INFP: ${calculateMBTI(testAgree)}`)
console.log(`MBTI: ${calculateMBTI(testAnswer)}`)
