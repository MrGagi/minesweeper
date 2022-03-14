import React, { memo, useCallback } from "react";
import { Box } from "@mui/material";
import Field from "./Field";
import { openField } from "../BoardSlice";
import { BoardField } from "../BoardTypes";
import { useAppDispatch } from "../../common/store";

interface RowProps {
  columns: Array<BoardField>;
  rowIndex: number;
}

const Row = ({ columns, rowIndex }: RowProps) => {
  const dispatch = useAppDispatch();

  const handleOpenField = useCallback(
    (columnIndex: number) => {
      dispatch(openField({ x: columnIndex, y: rowIndex }));
    },
    [dispatch, rowIndex]
  );

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", width: "fit-content" }}
      data-testid="field-row"
    >
      {columns.map((field, index) => (
        <Field {...field} key={index} index={index} onClick={handleOpenField} />
      ))}
    </Box>
  );
};

export default memo(Row, (prevProps, newProps) => {
  return JSON.stringify(prevProps.columns) === JSON.stringify(newProps.columns);
});
