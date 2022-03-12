import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Level } from "./BoardTypes";

interface State {
  level: number;
  board: Board;
}

const initialState: State = {
  level: Level.BEGINNER,
  board: [],
};

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<number>) {
      state.level = action.payload;
    },
    setBoard(state, action: PayloadAction<Board>) {
      state.board = action.payload;
    },
    resetGame(state) {
      state.board = [];
    },
  },
});

export const { startGame, setBoard, resetGame } = boardSlice.actions;

export default boardSlice.reducer;
