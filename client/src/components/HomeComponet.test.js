import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HomeComponent from "./HomComponent";

// app.test.js
it("navigates home when you click the logo", () => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const root = document.createElement("div");
  document.body.appendChild(root);

  // Render app
  render(
    <MemoryRouter initialEntries={["/"]}>
      <HomeComponent />
    </MemoryRouter>,
    root
  );

  const { getByText } = within(screen.getByTestId("sign-up-text"));
  expect(getByText("I don't have an account")).toBeInTheDocument();
});
