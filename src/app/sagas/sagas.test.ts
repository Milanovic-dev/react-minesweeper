import React from "react";
import { Server } from "mock-socket";
import { createWebsocketConnection, newLevel, openCell } from "./sagas";
import {
  GameState,
  openCell as openCellAction,
  resetFlags,
  setError,
  setGameState,
  startNewLevel,
} from "../../features/board/boardSlice";
import { put } from "redux-saga/effects";

describe("Saga websocket communication", () => {
  let fakeURL = "ws://localhost:8080";
  let mockServer: Server;
  beforeEach(() => {
    if (mockServer) {
      mockServer.close();
    }

    mockServer = new Server(fakeURL);
    createWebsocketConnection(fakeURL);
  });

  it("opens cell successfully", () => {
    mockServer.on("connection", (socket) => {
      socket.on("message", (message) => {
        expect(message).toBe("open 0 0");
      });
    });

    const gen = openCell(openCellAction({ x: 0, y: 0 }));
    expect(gen.next().value).toStrictEqual(put(setError("")));
    expect(gen.next().done).toBeTruthy();
  });

  it("creates a new level", () => {
    const mapSize = 1;

    mockServer.on("connection", (socket) => {
      socket.on("message", (message) => {
        expect(message).toBe(`new ${mapSize}`);
      });
    });

    const gen = newLevel(startNewLevel(mapSize));

    expect(gen.next().value).toStrictEqual(
      put(setGameState(GameState.NOT_PLAYING))
    );
    expect(gen.next().value).toStrictEqual(put(resetFlags()));
    expect(gen.next().done).toBeTruthy();
  });

  afterAll(() => {
    if (mockServer) {
      mockServer.close();
    }
  });
});
