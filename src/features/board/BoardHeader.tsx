import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { startNewLevel, MapSize, GameState } from "./boardSlice";
import { useStopwatch } from "react-timer-hook";

export const BoardHeader = () => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.boardReducer.gameState);
  const [selectedMapSize, setSelectedMapSize] = useState(MapSize.Beginner);
  const { seconds, minutes, reset, pause } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (gameState === GameState.NOT_PLAYING) {
      reset();
      pause();
    } else if (gameState === GameState.WON || gameState === GameState.LOST) {
      pause();
    } else if (gameState === GameState.PLAYING) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMapSize(Number((event.target as HTMLInputElement).value));
  };

  return (
    <>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography color="textPrimary">Difficulty</Typography>
          </FormLabel>
          <RadioGroup
            onChange={handleChange}
            aria-label="map-size"
            row
            defaultValue={MapSize.Beginner}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value={MapSize.Beginner}
              control={<Radio />}
              label="1"
            />
            <FormControlLabel
              value={MapSize.Intermidiate}
              control={<Radio />}
              label="2"
            />
            <FormControlLabel
              value={MapSize.Expert}
              control={<Radio />}
              label="3"
            />
            <FormControlLabel
              value={MapSize.Pro}
              control={<Radio />}
              label="4"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          color="secondary"
          onClick={() => dispatch(startNewLevel(selectedMapSize))}
        >
          <SentimentSatisfiedAltIcon />
        </IconButton>
        <Typography>
          {minutes}:{seconds}
        </Typography>
      </Box>
    </>
  );
};
