import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const crabs = this.input.split(',').map((x) => +x);
    const fuelConsumption: number[] = [];

    for (const crab of crabs) {
      let sum = 0;
      for (let j = 0; j < crabs.length; j++) {
        sum += Math.abs(crabs[j] - crab);
      }
      fuelConsumption.push(sum);
    }

    return Math.min(...fuelConsumption).toString();
  }

  public getFirstExpectedResult(): string {
    return '37';
  }

  public solveSecond(): string {
    const crabs = this.input.split(',').map((x) => +x);
    const [lowerBound, upperBound] = [Math.min(...crabs), Math.max(...crabs)];
    const fuelConsumption: number[] = [];

    for (let j = lowerBound; j <= upperBound; j++) {
      let sum = 0;
      for (const crab of crabs) {
        const n = Math.abs(j - crab);
        sum += (n * (n + 1)) / 2;
      }
      fuelConsumption.push(sum);
    }

    return Math.min(...fuelConsumption).toString();
  }

  public getSecondExpectedResult(): string {
    return '168';
  }
}
