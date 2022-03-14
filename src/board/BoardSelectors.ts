import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../common/store";
import { getFlagKey } from "./BoardSlice";
import { BoardFieldTypes } from "./BoardTypes";

const selectBoardReducer = (state: RootState) => {
  return state.boardReducer;
};

export const selectBoard = createSelector(selectBoardReducer, (state) => {
  return state.board.map((row, rowIndex) => {
    return row.map((field, columnIndex) => {
      if (state.flags[getFlagKey(rowIndex, columnIndex)]) {
        const newField = { ...field };
        newField.type = BoardFieldTypes.FLAG;
        newField.value = null;
        return newField;
      }

      return field;
    });
  });
});
