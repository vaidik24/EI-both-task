import { ScheduleManager } from "./managers/ScheduleManager.js";
import { TaskFactory } from "./factories/TaskFactory.js";
import assert from "assert";
// Main function to run the application logic
const main = () => {
  const scheduleManager = ScheduleManager.getInstance();
  // Example: Adding a task to the schedule
  const task1 = TaskFactory.createTask("Space Walk", "10:00", "11:00", "High");
  console.log(scheduleManager.addTask(task1));
  // Example: Viewing tasks
  console.log(scheduleManager.getTasks());
};
// Function to run manual tests
const runTests = () => {
  const scheduleManager = ScheduleManager.getInstance();
  // Utility to reset scheduleManager before each test
  const resetScheduleManager = () => {
    scheduleManager.clearAllTasks(); // Assuming you have this method to clear tasks
  };
  console.log("Running tests...");
  // Test 1: Add a task to the schedule
  resetScheduleManager();
  const task1 = TaskFactory.createTask("Space Walk", "10:00", "11:00", "High");
  const addResult1 = scheduleManager.addTask(task1);
  assert.strictEqual(
    addResult1,
    "Task added successfully",
    "Test 1 Failed: Task should be added successfully."
  );
  assert.strictEqual(
    scheduleManager.getTasks().length,
    1,
    "Test 1 Failed: There should be 1 task."
  );
  console.log("Test 1 Passed: Add a task to the schedule");
  // Test 2: Retrieve tasks sorted by start time
  resetScheduleManager();
  const task2 = TaskFactory.createTask(
    "Morning Exercise",
    "07:00",
    "08:00",
    "Medium"
  );
  const task3 = TaskFactory.createTask("Space Walk", "10:00", "11:00", "High");
  scheduleManager.addTask(task2);
  scheduleManager.addTask(task3);
  const tasks = scheduleManager.getTasks();
  assert.strictEqual(
    tasks.length,
    2,
    "Test 2 Failed: There should be 2 tasks."
  );
  assert.strictEqual(
    tasks[0].startTime,
    "07:00",
    "Test 2 Failed: Tasks should be sorted by start time."
  );
  assert.strictEqual(
    tasks[1].startTime,
    "10:00",
    "Test 2 Failed: Task order is incorrect."
  );
  console.log("Test 2 Passed: Retrieve tasks sorted by start time");
  // Test 3: Prevent adding overlapping tasks
  resetScheduleManager();
  const task4 = TaskFactory.createTask("Space Walk", "10:00", "11:00", "High");
  const task5 = TaskFactory.createTask(
    "Training Session",
    "10:30",
    "11:30",
    "Medium"
  );
  scheduleManager.addTask(task4);
  const addResult2 = scheduleManager.addTask(task5);
  assert.strictEqual(
    addResult2,
    'Error: Task conflicts with existing task "Space Walk".',
    "Test 3 Failed: Task conflict not detected."
  );
  assert.strictEqual(
    scheduleManager.getTasks().length,
    1,
    "Test 3 Failed: Only 1 task should be added due to conflict."
  );
  console.log("Test 3 Passed: Prevent adding overlapping tasks");
  // Test 4: Singleton instance of ScheduleManager
  resetScheduleManager();
  const anotherInstance = ScheduleManager.getInstance();
  assert.strictEqual(
    scheduleManager,
    anotherInstance,
    "Test 4 Failed: ScheduleManager is not a singleton."
  );
  console.log("Test 4 Passed: Singleton instance of ScheduleManager");
  // Test 5: Clear all tasks
  resetScheduleManager();
  scheduleManager.addTask(task1);
  scheduleManager.clearAllTasks();
  assert.strictEqual(
    scheduleManager.getTasks().length,
    0,
    "Test 5 Failed: ScheduleManager did not clear all tasks."
  );
  console.log("Test 5 Passed: Clear all tasks");
};
// Entry point of the application
const init = () => {
  const args = process.argv.slice(2); // Get command-line arguments
  if (args.includes("--test")) {
    runTests(); // Run tests if --test flag is passed
  } else {
    main(); // Otherwise, run the main application logic
  }
};
init();
