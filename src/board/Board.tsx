import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector } from "../common/store";
import { GameStatus } from "./BoardTypes";
import Row from "./row/Row";

const Board = () => {
  const { board, gameStatus } = useAppSelector((state) => state.boardReducer);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "max-content",
        marginTop: 2,
      }}
    >
      {gameStatus === GameStatus.WON && (
        <Typography fontWeight="bold" color="success">
          You won!
        </Typography>
      )}
      {gameStatus === GameStatus.LOST && (
        <Typography fontWeight="bold" color="error">
          Whoops, looks like you've hit the bomb!
        </Typography>
      )}
      {board.map((row, index) => (
        <Row columns={row} rowIndex={index} key={index} />
      ))}
    </Box>
  );
};

export default React.memo(Board);
