import { Board, BoardCellTypes } from "../../../board/BoardTypes";
import { SocketEvent } from "./SocketEvent";

export const BoardMap: Record<string, BoardCellTypes> = {
  "*": BoardCellTypes.BOMB,
  "□": BoardCellTypes.EMPTY,
};

export class BoardReceivedEvent extends SocketEvent {
  constructor(private listener: (message: Board) => void) {
    super();
  }

  /**
   * Parse message that we got from websocket server
   *
   * Parser:
   * * = -2 (Bomb)
   * □ = -1 (Empty)
   */
  sendEvent(message: string) {
    let rows = message.split("\n");
    rows = rows.slice(1, rows.length - 1);

    let board: Board = rows.map((row) => {
      let cols = [];
      for (let char of row) {
        const type = char in BoardMap ? BoardMap[char] : BoardCellTypes.NUMBER;
        cols.push({
          type,
          value: type === BoardCellTypes.NUMBER ? Number(char) : null,
        });
      }

      return cols;
    });

    this.listener(board);
  }

  isApplicable(message: string): boolean {
    return message.startsWith("map");
  }
}
