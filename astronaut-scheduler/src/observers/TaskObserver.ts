export interface Observer {
  notify(message: string): void;
}

export class TaskObserver implements Observer {
  notify(message: string): void {
    console.log(`Notification: ${message}`);
  }
}
