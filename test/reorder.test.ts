import { getConsecutiveGroups, switchOrder } from '../src/reorder'

describe('Re-order list items', () => {
  describe('getConsecutiveGroups', () => {
    it('연속된 숫자들은 그룹화하고 그렇지 않은 숫자는 개별 배열로 만들어야 한다.', () => {
      expect(getConsecutiveGroups([1, 2, 4, 5])).toEqual([
        [1, 2],
        [4, 5],
      ])
      expect(getConsecutiveGroups([1, 3, 5])).toEqual([[1], [3], [5]])
      expect(getConsecutiveGroups([1, 2, 3])).toEqual([[1, 2, 3]])
    })
  })

  describe('switchOrder', () => {
    it('선택된 요소들의 위치를 한칸 씩 왼쪽으로 이동시킨다.', () => {
      const testData = [1, 2, 3, 4, 5]
      expect(switchOrder(testData, [2])).toEqual([2, 1, 3, 4, 5])
      expect(switchOrder(testData, [3, 4])).toEqual([1, 3, 4, 2, 5])
      expect(switchOrder(testData, [2, 4, 5])).toEqual([2, 1, 4, 5, 3])
    })

    it('첫번째 요소가 선택된 경우, 첫번째 요소의 순서는 바뀌지 않는다.', () => {
      const testData = [1, 2, 3]
      expect(switchOrder(testData, [1])).toEqual([1, 2, 3])
      expect(switchOrder(testData, [1, 3])).toEqual([1, 3, 2])
    })

    it('선택된 요소들의 순서에 상관없이 원본 데이터의 순서에 따라 이동한다.', () => {
      const testData = [1, 2, 3]
      expect(switchOrder(testData, [2, 1])).toEqual([1, 2, 3])
      expect(switchOrder(testData, [3, 1])).toEqual([1, 3, 2])
      expect(switchOrder(testData, [3, 2])).toEqual([2, 3, 1])
    })

    it('원본 데이터에 없는 요소가 선택되면 에러가 발생한다.', () => {
      const testData = [1, 2, 3]
      expect(() => switchOrder(testData, [4])).toThrow(
        'selected의 요소는 data의 포함된 값이여야 합니다.'
      )
    })
  })
})
