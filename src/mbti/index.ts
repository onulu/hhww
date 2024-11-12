import { MBTIScore, Question, AnswerType, UserAnswer } from './types'
import { questions, SCORE_MAP, initialScore } from './constants'

export const updateScore = (
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

export const getMBTIFromScore = (score: MBTIScore) => {
  const MBTI = [
    score.E >= score.I ? 'E' : 'I',
    score.S > score.N ? 'S' : 'N',
    score.F >= score.T ? 'F' : 'T',
    score.P >= score.J ? 'P' : 'J',
  ].join('')

  return MBTI
}

export const calculateMBTI = (answers: UserAnswer) => {
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
