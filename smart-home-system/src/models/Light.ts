import { IDevice } from "./Device";

export class Light implements IDevice {
  id: number;
  type: string;
  private status: string;

  constructor(id: number, status: string = "off") {
    this.id = id;
    this.type = "light";
    this.status = status;
  }

  turnOn(): void {
    this.status = "on";
    console.log(`Light ${this.id} turned on.`);
  }

  turnOff(): void {
    this.status = "off";
    console.log(`Light ${this.id} turned off.`);
  }

  getStatus(): string {
    return `Light ${this.id} is ${
      this.status.charAt(0).toUpperCase() + this.status.slice(1)
    }.`;
  }
}
