import { Logger } from "../utils/Logger.js";
export class TriggerManager {
  constructor(deviceManager) {
    this.triggers = [];
    this.deviceManager = deviceManager;
    this.logger = new Logger();
  }
  addTrigger(condition, action) {
    this.triggers.push({ condition, action });
    this.logger.log(`Added trigger: If ${condition}, then ${action}`);
  }
  getTriggers() {
    return this.triggers;
  }
  evaluateTriggers() {
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
