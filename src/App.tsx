import { Box, Container } from "@mui/material";
import React from "react";
import "./App.css";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <Box sx={{ m: 2 }}>
      <Container maxWidth="md">
        <h1>LiveArt Challenge - Minesweeper</h1>
        <Dashboard />
      </Container>
    </Box>
  );
}

export default App;
