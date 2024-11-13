# Shifting Orders

## Requirements
  
- selected 배열에 포함된 data 배열의 원소들을 왼쪽으로 한 칸씩 옴기는 콘솔 프로그램
- 배열에서 선택된 요소들의 순서를 앞으로(왼쪽으로) 한칸씩 이동시킨다.


## Solved

- 선택된 요소들에서 연속된 요소들을 그룹으로 분리하는 로직 작성
- 그룹을 순회하면서 `splice`를 통해 원본 데이터에서 그룹부분을 자르고 배열의 순서를 재구성

## How to run test

```shell
pnpm test:reorder
```
