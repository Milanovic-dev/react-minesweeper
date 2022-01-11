import React, { useState, memo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { BOMB_CHAR, fieldCharset } from "../common/representation";
import { getValueColor } from "./helpers";
import { addFlag, openCell } from "../board/boardSlice";
import FlagIcon from "@mui/icons-material/Flag";
import Brightness5Icon from "@mui/icons-material/Brightness5";

export interface CellProps {
  isOpen: boolean;
  value: number;
  row: number;
  col: number;
  isFlagged: boolean;
}

export const CELL_WIDTH = 30;
export const CELL_HEIGHT = 30;

const CellContent = ({ value }: { value: number }) => {
  if (value > 0) {
    return (
      <Typography fontWeight="bold" color={getValueColor(value)}>
        {value}
      </Typography>
    );
  } else if (value === fieldCharset[BOMB_CHAR]) {
    return <Brightness5Icon fontSize="small" />;
  }

  return null;
};

export const Cell = memo(
  ({ row, col, value, isOpen, isFlagged }: CellProps) => {
    const dispatch = useAppDispatch();
    const { palette } = useTheme();

    return (
      <Box
        sx={{
          display: "flex",
          placeContent: "center",
          alignItems: "center",
          width: CELL_WIDTH,
          height: CELL_HEIGHT,
          border: "1px solid gray",
          cursor: "pointer",
          fontWeight: "bold",
          backgroundColor: isOpen ? palette.primary.main : "white",
        }}
        onClick={() => !isFlagged && dispatch(openCell({ x: col, y: row }))}
        onContextMenu={(e) => {
          e.preventDefault();
          dispatch(addFlag({ x: row, y: col }));
        }}
      >
        {isFlagged ? (
          <FlagIcon fontSize="small" />
        ) : isOpen ? (
          <CellContent value={value} />
        ) : null}
      </Box>
    );
  }
);
