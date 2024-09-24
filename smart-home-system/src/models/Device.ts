export interface IDevice {
  id: number;
  type: string;
  status: string;
  turnOn(): void;
  turnOff(): void;
  getStatus(): string;
}
