type MBTIType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export type AnswerType =
  | '매우 아니다'
  | '아니다'
  | '보통이다'
  | '그렇다'
  | '매우 그렇다'

export type UserAnswer = AnswerType[]

export interface Question {
  disagree: MBTIType
  agree: MBTIType
  text: string
}

export interface MBTIScore {
  E: number
  I: number
  S: number
  N: number
  T: number
  F: number
  J: number
  P: number
}
