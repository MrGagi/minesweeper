import { SocketEvent } from "./SocketEvent";

export class SocketErrorEvent extends SocketEvent {
  constructor(private listener: () => void) {
    super();
  }

  sendEvent() {
    this.listener();
  }

  isApplicable(message: string): boolean {
    return message === null;
  }
}
