import SendMessage from "./SendMessage";

export default class OpenFieldMessage implements SendMessage {
  message: string;

  constructor(x: number, y: number) {
    this.message = `open ${x} ${y}`;
  }
}
