import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  chunkMappings: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  };
  chunkOpenings = Object.keys(this.chunkMappings);

  public solveFirst(): string {
    const pointTable: { [key: string]: number } = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
    };

    const lines = this.input.split('\n');
    let sum = 0;

    for (const line of lines) {
      const stack = [];
      for (const symbol of line) {
        if (this.chunkOpenings.includes(symbol)) {
          stack.push(symbol);
          continue;
        }

        const lastOpened = stack.pop();
        if (this.chunkMappings[lastOpened] !== symbol)
          sum += pointTable[symbol];
      }
    }

    return sum.toString();
  }

  public getFirstExpectedResult(): string {
    return '26397';
  }

  public solveSecond(): string {
    const pointTable: { [key: string]: number } = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4,
    };

    const lines = this.input.split('\n');
    const scores = [];

    for (const line of lines) {
      let stack = [];
      for (const symbol of line) {
        if (this.chunkOpenings.includes(symbol)) {
          stack.push(symbol);
          continue;
        }

        const lastOpened = stack.pop();
        if (this.chunkMappings[lastOpened] !== symbol) {
          stack = [];
          break;
        }
      }

      if (!stack.length) continue;

      const score = stack
        .reverse()
        .map((x) => pointTable[this.chunkMappings[x]])
        .reduce((acc, curr) => acc * 5 + curr, 0);

      scores.push(score);
    }

    return scores.sort((a, b) => a - b)[(scores.length - 1) / 2].toString();
  }

  public getSecondExpectedResult(): string {
    return '288957';
  }
}
