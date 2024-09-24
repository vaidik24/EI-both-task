import { Task } from "../models/Task";

export class Validator {
  public static hasConflict(newTask: Task, tasks: Task[]): boolean {
    return tasks.some(
      (task) =>
        newTask.startTime < task.endTime && newTask.endTime > task.startTime
    );
  }
}
