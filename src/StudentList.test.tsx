//StudentList.test.js

import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import StudentList from "./StudentList";

const server = setupServer(
  rest.get("/api/students", (req, res, ctx) => {
    return res(
      ctx.json([
        { firstName: "George", lastName: "Washington", homeroom: "A" },
        { firstName: "Matthew", lastName: "Damon", homeroom: "B" },
        { firstName: "Mariah", lastName: "Carey", homeroom: "C" },
      ])
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
it("should populate student entry on state after a successful API call", async () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  render(<StudentList />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  let element = await waitFor(() => screen.findByText(/George*/i));
  expect(element).toBeInTheDocument();
});
