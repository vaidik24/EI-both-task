import { Task } from "../models/Task";
import { Logger } from "../utils/Logger";
import { Validator } from "../utils/Validators";

export class ScheduleManager {
  private static instance: ScheduleManager;
  private tasks: Task[] = [];

  private constructor() {}

  public static getInstance(): ScheduleManager {
    if (!ScheduleManager.instance) {
      ScheduleManager.instance = new ScheduleManager();
    }
    return ScheduleManager.instance;
  }

  public addTask(task: Task): string {
    if (Validator.hasConflict(task, this.tasks)) {
      return "Error: Task conflicts with existing task.";
    }
    this.tasks.push(task);
    Logger.log("Task added successfully.");
    return "Task added successfully.";
  }

  public getTasks(): Task[] {
    return this.tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  public removeTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    Logger.log(`Task with id ${taskId} removed.`);
  }
  //clear all task
  public clearAllTasks(): void {
    this.tasks = [];
    Logger.log("All tasks cleared.");
  }
}
