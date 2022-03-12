import { SocketErrorEvent } from "./listeners/SocketErrorEvent";
import { SocketEvent } from "./listeners/SocketEvent";
import SendMessage from "./messages/SendMessage";

export default class WebSocketServer {
  private server: WebSocket | null = null;
  private listeners: Array<SocketEvent> = [];

  constructor(private url: string | undefined = process.env.REACT_APP_WS_URL) {
    if (!this.url) {
      throw new Error(
        "Looks you are missing websocket url, please add it to environment variables"
      );
    }
  }

  addListeners(...events: SocketEvent[]) {
    this.listeners.push(...events);
  }

  disconnect() {
    this.server?.close();
  }

  send(message: SendMessage) {
    this.server?.send(message.message);
  }

  connect() {
    this.server = new WebSocket(this.url!);

    this.server.onopen = () => {
      console.log("Connected to websocket server...");
    };

    this.server.onerror = () => {
      this.listeners.forEach((listener) => {
        if (listener instanceof SocketErrorEvent) {
          listener.notify("There was an issue with socket connect");
        }
      });
    };

    this.server.onmessage = (message: MessageEvent<string>) => {
      this.listeners.forEach((listener) => {
        if (listener?.isApplicable(message.data)) {
          listener.notify(message.data);
        }
      });
    };
  }
}
