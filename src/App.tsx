import { Box } from "@mui/material";
import React from "react";
import { Board } from "./features/board/Board";

function App() {
  return (
    <Box sx={{ m: 2 }}>
      <h1>React Minesweeper</h1>
      <Board />
    </Box>
  );
}

export default App;
