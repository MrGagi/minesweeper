import { all } from "redux-saga/effects";
import { socketSagas } from "./sockets/socket.sagas";

export function* rootSaga() {
  yield all([socketSagas()]);
}
