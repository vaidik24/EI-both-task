import { IDevice } from "../models/Device";
import { DeviceFactory } from "../factories/DeviceFactory";
import { DeviceProxy } from "../proxies/DeviceProxy";
import { Subject } from "../observers/Subject";
import { Logger } from "../utils/Logger";

export class DeviceManager extends Subject {
  private devices: Map<number, IDevice> = new Map();
  private logger: Logger;

  constructor(initialDevices: any[]) {
    super();
    this.logger = new Logger();
    initialDevices.forEach((deviceInfo) => this.addDevice(deviceInfo));
  }

  addDevice(deviceInfo: any): void {
    try {
      const device = DeviceFactory.createDevice(deviceInfo);
      const proxy = new DeviceProxy(device);
      this.devices.set(proxy.id, proxy);
      this.subscribe(proxy as any);
      this.logger.log(`Added device: ${proxy.getStatus()}`);
      this.notify("deviceAdded", proxy);
    } catch (error) {
      this.logger.error(`Error adding device: ${error.message}`);
    }
  }

  removeDevice(id: number): void {
    if (this.devices.has(id)) {
      const device = this.devices.get(id);
      this.devices.delete(id);
      this.logger.log(`Removed device: ${device?.getStatus()}`);
      this.notify("deviceRemoved", device);
    } else {
      this.logger.error(`Device with ID ${id} does not exist.`);
    }
  }

  getDevice(id: number): IDevice | undefined {
    return this.devices.get(id);
  }

  getAllStatuses(): string {
    let statusReport = "";
    this.devices.forEach((device) => {
      statusReport += device.getStatus() + " ";
    });
    return statusReport.trim();
  }

  executeCommand(command: string): void {
    try {
      eval(command);
      this.logger.log(`Executed command: ${command}`);
    } catch (error) {
      this.logger.error(
        `Error executing command "${command}": ${error.message}`
      );
    }
  }
}
