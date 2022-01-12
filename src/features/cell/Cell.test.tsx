import React from "react";
import { render } from "@testing-library/react";
import { Cell } from "./Cell";
import { ThemeProvider } from "@mui/material";
import { baseTheme } from "../../app/theme";

describe("Cell", () => {
  it("should render correctly", () => {
    const leftClick = jest.fn();
    const rightClick = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={baseTheme}>
        <Cell
          value={2}
          isFlagged={false}
          isOpen={true}
          onLeftClick={leftClick}
          onRightClick={rightClick}
        />
      </ThemeProvider>
    );

    expect(getByText(/2/i)).toBeInTheDocument();
  });
});
