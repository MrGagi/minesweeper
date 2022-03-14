import { Server } from "mock-socket";
import {
  createWebsocketConnection,
  startGame,
  openField,
} from "./socket.sagas";

describe("Communication with websocket", () => {
  let fakeURL = "ws://localhost:8080";
  let mockServer: Server;

  beforeEach(() => {
    if (mockServer) {
      mockServer.close();
    }

    mockServer = new Server(fakeURL);
    process.env.REACT_APP_WS_URL = fakeURL;
    createWebsocketConnection();
  });

  it("Should be able to start new game", () => {
    mockServer.on("connection", (socket) => {
      socket.on("message", (message) => {
        expect(message).toBe("new 3");
      });
    });

    startGame({ payload: 3, type: "action" }).next();
  });

  it("Should be able to open field in the game", () => {
    mockServer.on("connection", (socket) => {
      socket.on("message", (message) => {
        expect(message).toBe("open 1 1");
      });
    });

    openField({ payload: { x: 1, y: 1 }, type: "action" }).next();
  });

  afterAll(() => {
    if (mockServer) {
      mockServer.close();
    }
  });
});
