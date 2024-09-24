export class Task {
    constructor(description, startTime, endTime, priority) {
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.priority = priority;
        this.id = Task.idCounter++;
    }
}
Task.idCounter = 0;
