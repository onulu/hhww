# MBTI Calculator

## Requirements

MBTI를 계산해 콘솔에 출력하는 콘솔 프로그램
모든 문항에 대한 선택지는 다섯개로 동일하며 다음과 같습니다.
`매우 아니다`, `아니다`, `보통이다`, `그렇다`, `매우 그렇다`

선택지에 따라 다음과 같이 점수를 부여합니다.
`매우 아니다`는 disagree 타입에 2점
`아니다`는 disagree 타입에 1점
`보통이다`는 양쪽에 0점
`그렇다`는 agree 타입에 1점
`매우 그렇다`는 agree 타입에 2점

자리가 같은 두 알파벳의 점수가 같은 경우 다음과 같이 처리합니다.

```
E == I: E
S == N: N
F == T: F
P == J: P
```

## Solved

- 사용자 응답을 숫자로 맵핑해 disagree의 경우 음수, agree의 경우 양수로 구분할 수 있는 로직 작성.
- MBTI 모든 타입에 대한 점수를 score객체로 관리하고 최종 점수를 가지고 MBTI타입으로 변환하는 로직 구현.


## How to run test

```shell
pnpm test:mbti
```
