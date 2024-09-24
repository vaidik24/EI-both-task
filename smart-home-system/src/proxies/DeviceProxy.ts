import { IDevice } from "../models/Device";
import { Logger } from "../utils/Logger";

export class DeviceProxy implements IDevice {
  private device: IDevice;
  private logger: Logger;

  constructor(device: IDevice) {
    this.device = device;
    this.logger = new Logger();
  }

  get id(): number {
    return this.device.id;
  }

  get type(): string {
    return this.device.type;
  }

  get status(): string {
    return this.device.status;
  }

  turnOn(): void {
    this.logger.log(
      `Turning on device ${this.device.id} of type ${this.device.type}`
    );
    this.device.turnOn();
  }

  turnOff(): void {
    this.logger.log(
      `Turning off device ${this.device.id} of type ${this.device.type}`
    );
    this.device.turnOff();
  }

  getStatus(): string {
    return this.device.getStatus();
  }
}
