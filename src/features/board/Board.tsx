import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { Cell } from "../cell/Cell";
import { EMPTY_CHAR, fieldCharset } from "../common/representation";
import { GameState } from "./boardSlice";
import { BoardHeader } from "./BoardHeader";

export const Board = () => {
  const { map, flags, error, gameState } = useAppSelector(
    (state) => state.boardReducer
  );
  const gameEnded = gameState === GameState.WON || gameState === GameState.LOST;

  return (
    <Box width="fit-content">
      <BoardHeader />
      <Box>
        {map.map((row, i) => {
          return (
            <Box key={i} display="flex">
              {row.map((value, j) => (
                <Cell
                  key={`${i} ${j}`}
                  isOpen={value !== fieldCharset[EMPTY_CHAR]}
                  isFlagged={flags[`${i} ${j}`] !== undefined}
                  row={i}
                  col={j}
                  value={value}
                />
              ))}
            </Box>
          );
        })}
      </Box>
      <Typography>{gameEnded && `You ${gameState}!`}</Typography>
      <Typography color="error">{error}</Typography>
    </Box>
  );
};
