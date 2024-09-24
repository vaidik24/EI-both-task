import { Light } from "../models/Light.js";
import { Thermostat } from "../models/Thermostat.js";
import { DoorLock } from "../models/DoorLock.js";
export class DeviceFactory {
  static createDevice(deviceInfo) {
    const { id, type, status, temperature } = deviceInfo;
    switch (type.toLowerCase()) {
      case "light":
        return new Light(id, status);
      case "thermostat":
        return new Thermostat(id, temperature);
      case "door":
        return new DoorLock(id, status);
      default:
        throw new Error(`Device type "${type}" is not supported.`);
    }
  }
}
