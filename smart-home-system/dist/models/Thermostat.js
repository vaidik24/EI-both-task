export class Thermostat {
    constructor(id, temperature = 70) {
        this.id = id;
        this.type = "thermostat";
        this.temperature = temperature.toFixed
            ? Number(temperature.toFixed(1))
            : temperature;
        this.status = "on";
    }
    turnOn() {
        this.status = "on";
        console.log(`Thermostat ${this.id} turned on.`);
    }
    turnOff() {
        this.status = "off";
        console.log(`Thermostat ${this.id} turned off.`);
    }
    setTemperature(temp) {
        this.temperature = temp;
        console.log(`Thermostat ${this.id} temperature set to ${this.temperature} degrees.`);
    }
    getStatus() {
        return `Thermostat ${this.id} is set to ${this.temperature} degrees.`;
    }
    getTemperature() {
        return this.temperature;
    }
}
