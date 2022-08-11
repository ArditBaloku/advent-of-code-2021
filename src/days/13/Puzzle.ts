import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const lines = this.input.split('\n');
    const dots = lines
      .splice(0, lines.indexOf(''))
      .map((x) => x.split(',').map((y) => +y));
    const instructions = lines.slice(1);
    const maxX = Math.max(...dots.map((x) => x[0]));
    const maxY = Math.max(...dots.map((x) => x[1]));

    const paper = Array(maxY + 1)
      .fill('')
      .map(() => Array(maxX + 1).fill('.'));

    for (const [x, y] of dots) {
      paper[y][x] = '#';
    }

    this.foldAlong(paper, instructions[0]);

    return paper
      .reduce(
        (acc, row) =>
          acc + row.reduce((acc2, el) => (el === '#' ? acc2 + 1 : acc2), 0),
        0
      )
      .toString();
  }

  private foldAlong(paper: string[][], instruction: string) {
    const [axis, stringCoordinate] = instruction.split(' ')[2].split('=');
    const coordinate = +stringCoordinate;

    for (let i = axis === 'y' ? coordinate : 0; i < paper.length; i++) {
      for (let j = axis === 'x' ? coordinate : 0; j < paper[0].length; j++) {
        if (paper[i][j] === '#') {
          paper[i][j] = '.';

          if (axis === 'y') {
            const distance = paper.length - i - 1;
            paper[distance][j] = '#';
          } else {
            const distance = paper[0].length - j - 1;
            paper[i][distance] = '#';
          }
        }
      }
    }

    if (axis === 'y') {
      paper.splice(coordinate);
    } else {
      paper.forEach((row) => row.splice(coordinate));
    }
  }

  public getFirstExpectedResult(): string {
    return '17';
  }

  public solveSecond(): string {
    const lines = this.input.split('\n');
    const dots = lines
      .splice(0, lines.indexOf(''))
      .map((x) => x.split(',').map((y) => +y));
    const instructions = lines.slice(1);
    const maxX = Math.max(...dots.map((x) => x[0]));
    const maxY = Math.max(...dots.map((x) => x[1]));

    const paper = Array(maxY + 1)
      .fill('')
      .map(() => Array(maxX + 1).fill('.'));

    for (const [x, y] of dots) {
      paper[y][x] = '#';
    }

    for (const instruction of instructions) {
      this.foldAlong(paper, instruction);
    }

    for (const row of paper) {
      console.log(row.map((x) => (x === '.' ? ' ' : x)).join(''));
    }

    return paper
      .reduce(
        (acc, row) =>
          acc + row.reduce((acc2, el) => (el === '#' ? acc2 + 1 : acc2), 0),
        0
      )
      .toString();
  }

  public getSecondExpectedResult(): string {
    return '16';
  }
}
