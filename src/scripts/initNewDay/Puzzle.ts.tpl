import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return '';
  }

  public getFirstExpectedResult(): string {
    return '';
  }

  public solveSecond(): string {
    return '';
  }

  public getSecondExpectedResult(): string {
    return '';
  }
}
