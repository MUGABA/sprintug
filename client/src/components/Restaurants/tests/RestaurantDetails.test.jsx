import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import RestaurantDetails from "../RestaurantDetails";

RestaurantDetails;

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

it("renders Restaurant Details data", async () => {
  const fakeRestaurant = {
    name: "Joni Baez",
    location: "Kampala Uganda",
    cuisineType: "Chinese Cuisine",
    image: "",
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeRestaurant),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<RestaurantDetails />, container);
  });

  expect(container).toMatchSnapshot();

  global.fetch.mockRestore();
});
