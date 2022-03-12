import { Button, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Board from "../board/Board";
import { Level, PREDEFINED_LEVELS } from "../board/BoardTypes";
import LevelPicker from "../level-picker/LevelPicker";

const Dashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState(Level.BEGINNER);

  const handleLevelPickerChange = (option: number) => {
    setSelectedLevel(option);
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
        <Button variant="outlined" size="large" color="primary">
          Play
        </Button>
      </Box>
      <Board />
    </Container>
  );
};

export default Dashboard;
