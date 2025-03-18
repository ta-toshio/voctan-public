export const getPaginationIndex = (current: number, last: number): number[] => {
  const delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [];

  let l: number;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push(-1);
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
