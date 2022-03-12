import { PayloadAction } from "@reduxjs/toolkit";
import { eventChannel } from "redux-saga";
import { take, call, put, all, takeEvery } from "redux-saga/effects";
import { resetGame, setBoard } from "../board/BoardSlice";
import { SocketErrorEvent } from "./sockets/listeners/SocketErrorEvent";
import { BoardReceivedEvent } from "./sockets/listeners/BoardReceivedEvent";
import GetBoardMessage from "./sockets/messages/GetBoardMessage";
import NewGameMessage from "./sockets/messages/NewGameMessage";
import WebSocketServer from "./sockets/sockets";
import { Board } from "../board/BoardTypes";

const server = new WebSocketServer();

function createWebsocketConnection(url?: string) {
  return eventChannel((emitter) => {
    const boardReceivedListener = new BoardReceivedEvent((board: Board) => {
      emitter(setBoard(board));
    });

    const errorListener = new SocketErrorEvent(() => {
      console.log("got error");
    });

    server.addListeners(boardReceivedListener, errorListener);
    server.connect();

    return () => {
      server.disconnect();
    };
  });
}

function* watchAndHandleRequests(): any {
  const channel = yield call(createWebsocketConnection);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* startGame(action: PayloadAction<number>): Generator {
  yield resetGame();
  server.send(new NewGameMessage(action.payload));
  server.send(new GetBoardMessage());
}

export function* rootSaga() {
  yield all([
    watchAndHandleRequests(),
    takeEvery("boardSlice/startGame", startGame),
  ]);
}
