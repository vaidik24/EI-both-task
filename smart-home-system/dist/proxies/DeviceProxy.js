import { Logger } from "../utils/Logger.js";
export class DeviceProxy {
  constructor(device) {
    this.device = device;
    this.logger = new Logger();
  }
  get id() {
    return this.device.id;
  }
  get type() {
    return this.device.type;
  }
  get status() {
    return this.device.status;
  }
  turnOn() {
    this.logger.log(
      `Turning on device ${this.device.id} of type ${this.device.type}`
    );
    this.device.turnOn();
  }
  turnOff() {
    this.logger.log(
      `Turning off device ${this.device.id} of type ${this.device.type}`
    );
    this.device.turnOff();
  }
  getStatus() {
    return this.device.getStatus();
  }
}
