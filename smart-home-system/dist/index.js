import { DeviceManager } from "./managers/DeviceManager.js";
import { Scheduler } from "./managers/Scheduler.js";
import { TriggerManager } from "./managers/TriggerManager.js";
import { Logger } from "./utils/Logger.js";
// Example Input
const input = {
  devices: [
    { id: 1, type: "light", status: "off" },
    { id: 2, type: "thermostat", temperature: 70 },
    { id: 3, type: "door", status: "locked" },
  ],
  commands: [
    "turnOn(1)",
    "setSchedule(2, '06:00', 'turnOn(2)')",
    "addTrigger('deviceManager.getDevice(2)?.getTemperature() > 75', 'deviceManager.executeCommand(\"turnOff(1)\")')",
  ],
};
// Initialize Logger
const logger = new Logger();
// Initialize DeviceManager with devices
const deviceManager = new DeviceManager(input.devices);
// Initialize Scheduler
const scheduler = new Scheduler(deviceManager);
// Initialize TriggerManager
const triggerManager = new TriggerManager(deviceManager);
// Execute Commands
input.commands.forEach((command) => {
  var _a, _b;
  if (command.startsWith("turnOn")) {
    const id = parseInt(
      ((_a = command.match(/\d+/)) === null || _a === void 0
        ? void 0
        : _a[0]) || "0"
    );
    const device = deviceManager.getDevice(id);
    device === null || device === void 0 ? void 0 : device.turnOn();
  } else if (command.startsWith("turnOff")) {
    const id = parseInt(
      ((_b = command.match(/\d+/)) === null || _b === void 0
        ? void 0
        : _b[0]) || "0"
    );
    const device = deviceManager.getDevice(id);
    device === null || device === void 0 ? void 0 : device.turnOff();
  } else if (command.startsWith("setSchedule")) {
    const matches = command.match(
      /setSchedule\((\d+),\s*'([^']+)',\s*'([^']+)'\)/
    );
    if (matches) {
      const deviceId = parseInt(matches[1]);
      const time = matches[2];
      const cmd = matches[3];
      scheduler.scheduleTask(deviceId, time, cmd);
    }
  } else if (command.startsWith("addTrigger")) {
    const matches = command.match(/addTrigger\('([^']+)',\s*'([^']+)'\)/);
    if (matches) {
      const condition = matches[1];
      const action = matches[2];
      triggerManager.addTrigger(condition, action);
    }
  }
});
// Simulate Trigger Evaluation
triggerManager.evaluateTriggers();
// Output Status Report
console.log("\nDevice Status Report:");
console.log(deviceManager.getAllStatuses());
// Output Scheduled Tasks
console.log("\nScheduled Tasks:");
console.log(scheduler.getScheduledTasks());
// Output Automated Triggers
console.log("\nAutomated Triggers:");
console.log(triggerManager.getTriggers());
