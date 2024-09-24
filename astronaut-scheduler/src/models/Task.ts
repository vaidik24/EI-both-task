export class Task {
  private static idCounter = 0;
  public id: number;
  constructor(
    public description: string,
    public startTime: string,
    public endTime: string,
    public priority: string
  ) {
    this.id = Task.idCounter++;
  }
}
