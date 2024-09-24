export class DoorLock {
    constructor(id, status = "locked") {
        this.id = id;
        this.type = "door";
        this.status = status;
    }
    turnOn() {
        this.status = "unlocked";
        console.log(`Door ${this.id} unlocked.`);
    }
    turnOff() {
        this.status = "locked";
        console.log(`Door ${this.id} locked.`);
    }
    getStatus() {
        return `Door ${this.id} is ${this.status.charAt(0).toUpperCase() + this.status.slice(1)}.`;
    }
}
