import { PayloadAction } from "@reduxjs/toolkit";
import { eventChannel } from "redux-saga";
import { take, call, put, all, takeEvery } from "redux-saga/effects";
import { finishGame, resetGame, setBoard } from "../../board/BoardSlice";
import { SocketErrorEvent } from "./listeners/SocketErrorEvent";
import { BoardReceivedEvent } from "./listeners/BoardReceivedEvent";
import GetBoardMessage from "./messages/GetBoardMessage";
import NewGameMessage from "./messages/NewGameMessage";
import WebSocketServer from "./sockets";
import { Board, GameStatus } from "../../board/BoardTypes";
import OpenFieldMessage from "./messages/OpenFieldMessage";
import { GameStatusReceived } from "./listeners/GameStatusReceived";

const server = new WebSocketServer();

export function createWebsocketConnection() {
  return eventChannel((emitter) => {
    const boardReceivedListener = new BoardReceivedEvent((board: Board) => {
      emitter(setBoard(board));
    });

    const gameStatusReceivedListener = new GameStatusReceived(
      (status: GameStatus) => {
        emitter(finishGame(status));
      }
    );

    const errorListener = new SocketErrorEvent(() => {
      console.log(
        "Whoops, we got error on socket connection. Something is wrong!"
      );
    });

    server.addListeners(
      boardReceivedListener,
      gameStatusReceivedListener,
      errorListener
    );
    server.connect();

    return () => {
      server.disconnect();
    };
  });
}

export function* watchAndHandleRequests(): any {
  const channel = yield call(createWebsocketConnection);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* startGame(action: PayloadAction<number>): Generator {
  yield resetGame();
  server.send(new NewGameMessage(action.payload));
  server.send(new GetBoardMessage());
}

export function* openField(action: PayloadAction<{ x: number; y: number }>) {
  const x = action.payload.x;
  const y = action.payload.y;
  yield server.send(new OpenFieldMessage(x, y));
  yield server.send(new GetBoardMessage());
}

export function* socketSagas() {
  yield all([
    watchAndHandleRequests(),
    takeEvery("boardSlice/startGame", startGame),
    takeEvery("boardSlice/openField", openField),
  ]);
}
