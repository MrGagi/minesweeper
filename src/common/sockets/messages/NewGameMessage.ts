import { Level } from "../../../board/BoardTypes";
import SendMessage from "./SendMessage";

export default class NewGameMessage implements SendMessage {
  message: string;

  constructor(level: Level) {
    this.message = `new ${level}`;
  }
}
