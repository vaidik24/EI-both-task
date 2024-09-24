import { Logger } from "../utils/Logger.js";
import { Validator } from "../utils/Validators.js";
export class ScheduleManager {
  constructor() {
    this.tasks = [];
  }
  static getInstance() {
    if (!ScheduleManager.instance) {
      ScheduleManager.instance = new ScheduleManager();
    }
    return ScheduleManager.instance;
  }
  addTask(task) {
    if (Validator.hasConflict(task, this.tasks)) {
      return "Error: Task conflicts with existing task.";
    }
    this.tasks.push(task);
    Logger.log("Task added successfully.");
    return "Task added successfully.";
  }
  getTasks() {
    return this.tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }
  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    Logger.log(`Task with id ${taskId} removed.`);
  }
  //clear all task
  clearAllTasks() {
    this.tasks = [];
    Logger.log("All tasks cleared.");
  }
}
