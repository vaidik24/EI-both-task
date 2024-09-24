import { DeviceFactory } from "../factories/DeviceFactory.js";
import { DeviceProxy } from "../proxies/DeviceProxy.js";
import { Subject } from "../observers/Subject.js";
import { Logger } from "../utils/Logger.js";
export class DeviceManager extends Subject {
  constructor(initialDevices) {
    super();
    this.devices = new Map();
    this.logger = new Logger();
    initialDevices.forEach((deviceInfo) => this.addDevice(deviceInfo));
  }
  addDevice(deviceInfo) {
    try {
      const device = DeviceFactory.createDevice(deviceInfo);
      const proxy = new DeviceProxy(device);
      this.devices.set(proxy.id, proxy);
      this.subscribe(proxy);
      this.logger.log(`Added device: ${proxy.getStatus()}`);
      this.notify("deviceAdded", proxy);
    } catch (error) {
      this.logger.error(`Error adding device: ${error.message}`);
    }
  }
  removeDevice(id) {
    if (this.devices.has(id)) {
      const device = this.devices.get(id);
      this.devices.delete(id);
      this.logger.log(
        `Removed device: ${
          device === null || device === void 0 ? void 0 : device.getStatus()
        }`
      );
      this.notify("deviceRemoved", device);
    } else {
      this.logger.error(`Device with ID ${id} does not exist.`);
    }
  }
  getDevice(id) {
    return this.devices.get(id);
  }
  getAllStatuses() {
    let statusReport = "";
    this.devices.forEach((device) => {
      statusReport += device.getStatus() + " ";
    });
    return statusReport.trim();
  }
  executeCommand(command) {
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
