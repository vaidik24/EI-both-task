import { DeviceManager } from "./managers/DeviceManager";
import { Scheduler } from "./managers/Scheduler";
import { TriggerManager } from "./managers/TriggerManager";
import { Logger } from "./utils/Logger";

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
  if (command.startsWith("turnOn")) {
    const id = parseInt(command.match(/\d+/)?.[0] || "0");
    const device = deviceManager.getDevice(id);
    device?.turnOn();
  } else if (command.startsWith("turnOff")) {
    const id = parseInt(command.match(/\d+/)?.[0] || "0");
    const device = deviceManager.getDevice(id);
    device?.turnOff();
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
