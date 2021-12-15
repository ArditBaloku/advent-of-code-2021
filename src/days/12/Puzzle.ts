import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const connections = this.input.split('\n').map((x) => x.split('-'));
    const adjacencyList = new Map<string, string[]>();

    for (const [a, b] of connections) {
      if (!adjacencyList.has(a)) adjacencyList.set(a, [b]);
      else adjacencyList.get(a).push(b);

      if (!adjacencyList.has(b)) adjacencyList.set(b, [a]);
      else adjacencyList.get(b).push(a);
    }

    return this.getPathCount(adjacencyList).toString();
  }

  private getPathCount(
    adjacencyList: Map<string, string[]>,
    path: string[] = ['start']
  ): number {
    let pathCount = 0;
    for (const cave of adjacencyList.get(path[path.length - 1])) {
      if (cave === cave.toUpperCase() || !path.includes(cave))
        cave === 'end'
          ? (pathCount += 1)
          : (pathCount += this.getPathCount(
              adjacencyList,
              path.concat([cave])
            ));
    }

    return pathCount;
  }

  public getFirstExpectedResult(): string {
    return '10';
  }

  public solveSecond(): string {
    const connections = this.input.split('\n').map((x) => x.split('-'));
    const adjacencyList = new Map<string, string[]>();

    for (const [a, b] of connections) {
      if (!adjacencyList.has(a)) adjacencyList.set(a, [b]);
      else adjacencyList.get(a).push(b);

      if (!adjacencyList.has(b)) adjacencyList.set(b, [a]);
      else adjacencyList.get(b).push(a);
    }

    return this.getPathCount2(adjacencyList).toString();
  }

  private getPathCount2(
    adjacencyList: Map<string, string[]>,
    path: string[] = ['start']
  ): number {
    let pathCount = 0;
    for (const cave of adjacencyList.get(path[path.length - 1])) {
      if (cave === 'start') continue;
      if (cave === 'end') pathCount += 1;
      else if (cave === cave.toLowerCase() && path.includes(cave)) {
        pathCount += this.getPathCount(adjacencyList, path.concat([cave]));
      } else {
        pathCount += this.getPathCount2(adjacencyList, path.concat([cave]));
      }
    }

    return pathCount;
  }

  public getSecondExpectedResult(): string {
    return '36';
  }
}
