import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import TrainersDetails from "../../pages/admin/TrainersDetails";

describe("BusinessRequest component", () => {
  it("renders without crashing", () => {
    render(<TrainersDetails />);
  });
  test("renders table headers", async () => {
    render(<TrainersDetails />);
    const headers = screen.getByRole("heading");
    expect(headers).toBeInTheDocument();
  });
});
