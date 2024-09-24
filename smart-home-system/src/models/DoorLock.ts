import { IDevice } from "./Device";

export class DoorLock implements IDevice {
  id: number;
  type: string;
  private status: string;

  constructor(id: number, status: string = "locked") {
    this.id = id;
    this.type = "door";
    this.status = status;
  }

  turnOn(): void {
    this.status = "unlocked";
    console.log(`Door ${this.id} unlocked.`);
  }

  turnOff(): void {
    this.status = "locked";
    console.log(`Door ${this.id} locked.`);
  }

  getStatus(): string {
    return `Door ${this.id} is ${
      this.status.charAt(0).toUpperCase() + this.status.slice(1)
    }.`;
  }
}
