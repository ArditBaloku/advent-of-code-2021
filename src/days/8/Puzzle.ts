import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.input
      .split('\n')
      .map((x) => x.split('| ')[1].split(' '))
      .flat()
      .reduce(
        (acc, curr) => ([2, 3, 4, 7].includes(curr.length) ? acc + 1 : acc),
        0
      )
      .toString();
  }

  public getFirstExpectedResult(): string {
    return '26';
  }

  public solveSecond(): string {
    const rows = this.input.split('\n');
    let sum = 0;

    for (const row of rows) {
      const segmentMap = new Map();
      const [allNums, output] = row.split(' | ');
      const nums = allNums.split(' ').map((x) => x.split('').sort().join(''));

      const one = nums.find((x) => x.length === 2);
      const four = nums.find((x) => x.length === 4);
      const fourDiff = four.replace(one[0], '').replace(one[1], '');

      segmentMap.set(one, 1);
      segmentMap.set(four, 4);
      segmentMap.set(
        nums.find((x) => x.length === 3),
        7
      );
      segmentMap.set(
        nums.find((x) => x.length === 7),
        8
      );

      const twoThreeFive = nums.filter((x) => x.length === 5);
      const zeroSixNine = nums.filter((x) => x.length === 6);

      for (const num of twoThreeFive) {
        if (num.includes(one[0]) && num.includes(one[1]))
          segmentMap.set(num, 3);
        else if (num.includes(fourDiff[0]) && num.includes(fourDiff[1]))
          segmentMap.set(num, 5);
        else segmentMap.set(num, 2);
      }

      for (const num of zeroSixNine) {
        if (
          num.includes(four[0]) &&
          num.includes(four[1]) &&
          num.includes(four[2]) &&
          num.includes(four[3])
        )
          segmentMap.set(num, 9);
        else if (num.includes(fourDiff[0]) && num.includes(fourDiff[1]))
          segmentMap.set(num, 6);
        else segmentMap.set(num, 0);
      }

      sum += +output
        .split(' ')
        .map((x) => segmentMap.get(x.split('').sort().join('')))
        .join('');
    }

    return sum.toString();
  }

  public getSecondExpectedResult(): string {
    return '61229';
  }
}
