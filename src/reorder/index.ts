export const getConsecutiveGroups = (selectedIndices: number[]) => {
  const groups = []
  let currentGroup = [selectedIndices[0]]

  for (let i = 1; i < selectedIndices.length; i++) {
    if (selectedIndices[i] === selectedIndices[i - 1] + 1) {
      currentGroup.push(selectedIndices[i])
    } else {
      groups.push([...currentGroup])
      currentGroup = [selectedIndices[i]]
    }
  }
  groups.push(currentGroup)
  return groups
}

export const switchOrder = <T>(data: T[], selected: T[]) => {
  if (!selected.every((item) => data.includes(item))) {
    throw new Error('selected의 요소는 data의 포함된 값이여야 합니다.')
  }

  let result = [...data]

  const selectedIndices = result
    .map((item, index) => (selected.includes(item) ? index : -1))
    .filter((index) => index !== -1)

  const groupIndices = getConsecutiveGroups(selectedIndices)

  groupIndices.forEach((group) => {
    if (group[0] > 0) {
      const moved = result.splice(group[0], group.length)
      result.splice(group[0] - 1, 0, ...moved)
    }
  })
  return result
}
