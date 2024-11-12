import { Question, UserAnswer } from '../src/mbti/types'
import { initialScore } from '../src/mbti/constants'
import { calculateMBTI, updateScore } from '../src/mbti'

describe('MBTI Calculator', () => {
  describe('updateScore', () => {
    const testQuestion: Question = {
      disagree: 'E',
      agree: 'I',
      text: 'This is a test question',
    }
    it('agree 타입에 해당하는 점수를 업데이트 해야 한다.', () => {
      const result = updateScore(initialScore, testQuestion, '매우 그렇다')
      expect(result.I).toBe(2)
      expect(result.E).toBe(0)
    })

    it('disagree 타입에 해당하는 점수를 업데이트 해야 한다.', () => {
      const result = updateScore(initialScore, testQuestion, '매우 아니다')
      expect(result.E).toBe(2)
      expect(result.I).toBe(0)
    })

    it('보통이다라고 답하면 점수를 업데이트 하지 않아야 한다.', () => {
      const result = updateScore(initialScore, testQuestion, '보통이다')
      expect(result.E).toBe(0)
      expect(result.I).toBe(0)
    })
  })

  describe('calculateMBTI', () => {
    const allNeutral: UserAnswer = Array(8).fill('보통이다')
    const allAgree: UserAnswer = Array(8).fill('매우 그렇다')
    const allDisagree: UserAnswer = Array(8).fill('매우 아니다')

    it('사용자 응답이 모두 "보통이다"일 경우, ENFP를 반환해야 한다.', () => {
      const result = calculateMBTI(allNeutral)
      expect(result).toBe('ENFP')
    })

    it('사용자 응답이 모두 "매우 그렇다"일 경우, INFP를 반환해야 한다.', () => {
      const result = calculateMBTI(allAgree)
      expect(result).toBe('INFP')
    })

    it('사용자 응답이 모두 "매우 아니다"일 경우, ESTJ를 반환해야 한다.', () => {
      const result = calculateMBTI(allDisagree)
      expect(result).toBe('ESTJ')
    })
  })
})
