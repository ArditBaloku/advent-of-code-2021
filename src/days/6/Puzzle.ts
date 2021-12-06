import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return this.simulateDays(80);
  }

  public getFirstExpectedResult(): string {
    return '5934';
  }

  public solveSecond(): string {
    return this.simulateDays(256);
  }

  public getSecondExpectedResult(): string {
    return '26984457539';
  }

  private simulateDays(days: number): string {
    const fish = this.input.split(',').map((x) => +x);
    const dailyArray = Array(9).fill(0);
    fish.forEach((x) => dailyArray[x]++);

    for (let i = 0; i < days; i++) {
      this.simulateDay(dailyArray);
    }

    return dailyArray.reduce((acc, curr) => acc + curr, 0).toString();
  }

  private simulateDay(dailyArray: number[]) {
    const givingBirth = dailyArray.shift();
    dailyArray.push(givingBirth);
    dailyArray[6] += givingBirth;
  }
}
