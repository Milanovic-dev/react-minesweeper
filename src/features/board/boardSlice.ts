import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum GameState {
  WON = "WON",
  LOST = "LOST",
  PLAYING = "PLAYING",
  NOT_PLAYING = "NOT_PLAYING",
}

export enum MapSize {
  Beginner = 1,
  Intermidiate = 2,
  Expert = 3,
  Pro = 4,
}

export interface CellPosition {
  x: number;
  y: number;
}

export interface BoardState {
  map: Array<Array<number>>;
  flags: Record<string, any>;
  mapSize: MapSize;
  error: string;
  gameState: GameState;
}

const initialState: BoardState = {
  map: [],
  flags: {},
  error: "",
  mapSize: 1,
  gameState: GameState.NOT_PLAYING,
};

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    updateMap(state, action: PayloadAction<Pick<BoardState, "map">>) {
      state.map = action.payload.map;
    },
    startNewLevel(state, action: PayloadAction<MapSize>) {
      state.mapSize = action.payload;
    },
    openCell(state, action: PayloadAction<CellPosition>) {
      if (state.gameState === GameState.NOT_PLAYING) {
        state.gameState = GameState.PLAYING;
      }
    },
    addFlag(state, action: PayloadAction<CellPosition>) {
      state.flags[`${action.payload.x} ${action.payload.y}`] = action.payload;
    },
    resetFlags(state) {
      state.flags = {};
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setGameState(state, action: PayloadAction<GameState>) {
      state.gameState = action.payload;
    },
  },
});

export const {
  updateMap,
  startNewLevel,
  addFlag,
  openCell,
  setError,
  setGameState,
  resetFlags,
} = boardSlice.actions;

export default boardSlice.reducer;
