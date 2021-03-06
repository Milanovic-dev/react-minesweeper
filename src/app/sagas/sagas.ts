import { PayloadAction } from "@reduxjs/toolkit";
import { eventChannel } from "redux-saga";
import { take, call, put, all, takeEvery } from "redux-saga/effects";
import {
  CellPosition,
  GameState,
  resetFlags,
  setError,
  setGameState,
  updateMap,
} from "../../features/board/boardSlice";
import { transformStringMapToMatrix } from "../../features/common/representation";

export let ws: WebSocket;

export function createWebsocketConnection(url?: string) {
  return eventChannel((emitter) => {
    const wsUrl = url || process.env.REACT_APP_WS_URL;

    if (!wsUrl) {
      throw new Error("Websocket url is undefined");
    }

    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Opening connection...");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error" + error);
      return emitter(
        setError("There was an issue with the game. Please restart.")
      );
    };

    ws.onmessage = (message) => {
      const { data } = message;

      if (data.indexOf("map") !== -1) {
        return emitter(
          updateMap({ map: transformStringMapToMatrix(message.data) })
        );
      } else if (data.indexOf("open") !== -1) {
        if (data.indexOf("lose") !== -1) {
          return emitter(setGameState(GameState.LOST));
        } else if (data.indexOf("win") !== -1) {
          return emitter(setGameState(GameState.WON));
        }
      }
    };

    return () => {
      ws.close();
    };
  });
}

export default function* watchAndHandleRequests(): any {
  const channel = yield call(createWebsocketConnection);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* openCell(action: PayloadAction<CellPosition>) {
  yield put(setError(""));
  const x = action.payload.x;
  const y = action.payload.y;
  ws.send(`open ${x} ${y}`);
  ws.send("map");
}

export function* newLevel(action: PayloadAction<number>) {
  ws.send(`new ${action.payload}`);
  ws.send("map");
  yield put(setGameState(GameState.NOT_PLAYING));
  yield put(resetFlags());
}

export function* rootSaga() {
  yield all([
    watchAndHandleRequests(),
    takeEvery("boardSlice/openCell", openCell),
    takeEvery("boardSlice/startNewLevel", newLevel),
  ]);
}
