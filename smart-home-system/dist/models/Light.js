export class Light {
    constructor(id, status = "off") {
        this.id = id;
        this.type = "light";
        this.status = status;
    }
    turnOn() {
        this.status = "on";
        console.log(`Light ${this.id} turned on.`);
    }
    turnOff() {
        this.status = "off";
        console.log(`Light ${this.id} turned off.`);
    }
    getStatus() {
        return `Light ${this.id} is ${this.status.charAt(0).toUpperCase() + this.status.slice(1)}.`;
    }
}
