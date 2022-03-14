import { Button, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Board from "../board/Board";
import { Level, PREDEFINED_LEVELS } from "../board/BoardTypes";
import LevelPicker from "../board/level-picker/LevelPicker";
import { useAppDispatch } from "../common/store";
import { startGame } from "../board/BoardSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [selectedLevel, setSelectedLevel] = useState(Level.BEGINNER);

  const handleLevelPickerChange = (option: number) => {
    setSelectedLevel(option);
  };

  const play = () => {
    dispatch(startGame(selectedLevel));
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <LevelPicker
          onChange={handleLevelPickerChange}
          value={selectedLevel}
          options={PREDEFINED_LEVELS}
        />
        <Button variant="outlined" size="large" color="primary" onClick={play}>
          Play
        </Button>
      </Box>
      <Board />
    </Container>
  );
};

export default Dashboard;
