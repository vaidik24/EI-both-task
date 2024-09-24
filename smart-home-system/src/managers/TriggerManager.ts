import { DeviceManager } from "./DeviceManager";
import { Logger } from "../utils/Logger";

interface Trigger {
  condition: string;
  action: string;
}

export class TriggerManager {
  private triggers: Trigger[] = [];
  private deviceManager: DeviceManager;
  private logger: Logger;

  constructor(deviceManager: DeviceManager) {
    this.deviceManager = deviceManager;
    this.logger = new Logger();
  }

  addTrigger(condition: string, action: string): void {
    this.triggers.push({ condition, action });
    this.logger.log(`Added trigger: If ${condition}, then ${action}`);
  }

  getTriggers(): Trigger[] {
    return this.triggers;
  }

  evaluateTriggers(): void {
    this.triggers.forEach((trigger) => {
      try {
        if (eval(trigger.condition)) {
          eval(trigger.action);
          this.logger.log(`Triggered action: ${trigger.action}`);
        }
      } catch (error) {
        this.logger.error(
          `Error evaluating trigger "${trigger.condition}": ${error.message}`
        );
      }
    });
  }
}
