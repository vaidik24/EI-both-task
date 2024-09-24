export interface Observer {
  update(event: string, data: any): void;
}

export class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(event: string, data: any): void {
    this.observers.forEach((observer) => observer.update(event, data));
  }
}
