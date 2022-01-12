import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { Board } from "./Board";

describe("Board", () => {
  it("should render an empty board", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
