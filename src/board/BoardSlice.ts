import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, GameStatus, Level } from "./BoardTypes";

export interface BoardState {
  level: number;
  board: Board;
  flags: Record<string, boolean>;
  gameStatus: GameStatus;
}

const initialState: BoardState = {
  level: Level.BEGINNER,
  board: [],
  gameStatus: GameStatus.PLAYING,
  flags: {},
};

export const getFlagKey = (row: number, column: number) => {
  return `${row} ${column}`;
};

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<number>) {
      state.level = action.payload;
      state.gameStatus = GameStatus.PLAYING;
      state.flags = {};
    },
    setBoard(state, action: PayloadAction<Board>) {
      state.board = action.payload;
    },
    resetGame(state) {
      state.board = [];
      state.flags = {};
      state.gameStatus = GameStatus.PLAYING;
    },
    finishGame(state, action: PayloadAction<GameStatus>) {
      state.gameStatus = action.payload;
    },
    flagField(state, action: PayloadAction<{ row: number; column: number }>) {
      const { row, column } = action.payload;
      state.flags[getFlagKey(row, column)] = true;
    },
  },
});

export const openField = createAction<{ x: number; y: number }>(
  "boardSlice/openField"
);

export const { startGame, setBoard, resetGame, finishGame, flagField } =
  boardSlice.actions;

export default boardSlice.reducer;
