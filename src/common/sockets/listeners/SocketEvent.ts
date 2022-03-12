export abstract class SocketEvent {
  notify(message: string): void {
    this.sendEvent(message);
  }

  abstract sendEvent(message: string): void;
  abstract isApplicable(message: string): boolean;
}
