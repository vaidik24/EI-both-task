export class Validator {
    static hasConflict(newTask, tasks) {
        return tasks.some((task) => newTask.startTime < task.endTime && newTask.endTime > task.startTime);
    }
}
