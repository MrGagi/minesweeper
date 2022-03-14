import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../common/store";
import { selectBoard } from "./BoardSelectors";
import { GameStatus } from "./BoardTypes";
import Row from "./row/Row";

const Board = () => {
  const { gameStatus } = useAppSelector((state) => state.boardReducer);
  const board = useAppSelector(selectBoard);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: 2,
        overflow: board.length ? "scroll" : "initial",
        width: "100%",
      }}
    >
      {gameStatus === GameStatus.WON && (
        <Typography
          fontWeight="bold"
          color="success"
          data-testid="won-game-text"
        >
          You won!
        </Typography>
      )}
      {gameStatus === GameStatus.LOST && (
        <Typography
          fontWeight="bold"
          color="error"
          data-testid="lost-game-text"
        >
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
