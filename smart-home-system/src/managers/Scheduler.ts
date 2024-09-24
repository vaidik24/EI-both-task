import { DeviceManager } from "./DeviceManager";
import { Logger } from "../utils/Logger";

interface ScheduledTask {
  deviceId: number;
  time: string; // Format "HH:MM"
  command: string;
}

export class Scheduler {
  private tasks: ScheduledTask[] = [];
  private deviceManager: DeviceManager;
  private logger: Logger;

  constructor(deviceManager: DeviceManager) {
    this.deviceManager = deviceManager;
    this.logger = new Logger();
  }

  scheduleTask(deviceId: number, time: string, command: string): void {
    this.tasks.push({ deviceId, time, command });
    this.logger.log(
      `Scheduled task: ${command} on device ${deviceId} at ${time}`
    );
  }

  getScheduledTasks(): ScheduledTask[] {
    return this.tasks;
  }

  // Placeholder for actual scheduling logic
  runScheduledTasks(): void {
    // Implement scheduling logic using setTimeout or a scheduling library
  }
}
