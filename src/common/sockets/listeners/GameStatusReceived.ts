import { SocketEvent } from "./SocketEvent";
import { GameStatus } from "../../../board/BoardTypes";

export class GameStatusReceived extends SocketEvent {
  constructor(private listener: (gameStatus: GameStatus) => void) {
    super();
  }

  sendEvent(message: string) {
    if (message.includes("lose")) {
      this.listener(GameStatus.LOST);
    }

    if (message.includes("win")) {
      this.listener(GameStatus.WON);
    }
  }

  isApplicable(message: string): boolean {
    return message.startsWith("open");
  }
}
