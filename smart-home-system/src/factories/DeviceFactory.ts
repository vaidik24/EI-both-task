import { IDevice } from "../models/Device";
import { Light } from "../models/Light";
import { Thermostat } from "../models/Thermostat";
import { DoorLock } from "../models/DoorLock";

export class DeviceFactory {
  static createDevice(deviceInfo: any): IDevice {
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
