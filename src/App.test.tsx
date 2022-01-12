import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { baseTheme } from "./app/theme";

test("renders react minesweeper heading", () => {
  const { getByText } = render(
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  );

  expect(getByText(/minesweeper/i)).toBeInTheDocument();
});
