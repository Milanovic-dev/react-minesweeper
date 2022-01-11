import React, { memo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { BOMB_CHAR, fieldCharset } from "../common/representation";
import { getValueColor } from "./helpers";
import FlagIcon from "@mui/icons-material/Flag";
import Brightness5Icon from "@mui/icons-material/Brightness5";

export interface CellProps {
  isOpen: boolean;
  value: number;
  isFlagged: boolean;
  onLeftClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
  ({ value, isOpen, isFlagged, onLeftClick, onRightClick }: CellProps) => {
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
        onClick={(e) =>
          !isFlagged && typeof onLeftClick === "function" && onLeftClick(e)
        }
        onContextMenu={(e) => {
          e.preventDefault();
          typeof onRightClick === "function" && onRightClick(e);
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
