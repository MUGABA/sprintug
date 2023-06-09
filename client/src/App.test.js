import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
    container
  );

  expect(container.textContent).toBe("");
});
