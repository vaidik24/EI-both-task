import { IDevice } from "./Device";

export class Thermostat implements IDevice {
  id: number;
  type: string;
  private temperature: number;

  constructor(id: number, temperature: number = 70) {
    this.id = id;
    this.type = "thermostat";
    this.temperature = temperature.toFixed
      ? Number(temperature.toFixed(1))
      : temperature;
    this.status = "on";
  }

  status: string;

  turnOn(): void {
    this.status = "on";
    console.log(`Thermostat ${this.id} turned on.`);
  }

  turnOff(): void {
    this.status = "off";
    console.log(`Thermostat ${this.id} turned off.`);
  }

  setTemperature(temp: number): void {
    this.temperature = temp;
    console.log(
      `Thermostat ${this.id} temperature set to ${this.temperature} degrees.`
    );
  }

  getStatus(): string {
    return `Thermostat ${this.id} is set to ${this.temperature} degrees.`;
  }

  getTemperature(): number {
    return this.temperature;
  }
}
