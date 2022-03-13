import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, GameStatus, Level } from "./BoardTypes";

interface State {
  level: number;
  board: Board;
  gameStatus: GameStatus;
}

const initialState: State = {
  level: Level.BEGINNER,
  board: [],
  gameStatus: GameStatus.PLAYING,
};

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<number>) {
      state.level = action.payload;
      state.gameStatus = GameStatus.PLAYING;
    },
    setBoard(state, action: PayloadAction<Board>) {
      state.board = action.payload;
    },
    resetGame(state) {
      state.board = [];
      state.gameStatus = GameStatus.PLAYING;
    },
    finishGame(state, action: PayloadAction<GameStatus>) {
      state.gameStatus = action.payload;
    },
  },
});

export const openField = createAction<{ x: number; y: number }>(
  "boardSlice/openField"
);

export const { startGame, setBoard, resetGame, finishGame } =
  boardSlice.actions;

export default boardSlice.reducer;
