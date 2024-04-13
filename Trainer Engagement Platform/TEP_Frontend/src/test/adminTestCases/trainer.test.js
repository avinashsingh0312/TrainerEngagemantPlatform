import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TrainersDetails from "../../pages/admin/TrainersDetails";

describe("TrainersDetails Component", () => {
  it("renders without crashing", () => {
    render(<TrainersDetails />);
  });

  it("renders table headers correctly", async () => {
    render(<TrainersDetails />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(7);
    expect(headers[0]).toHaveTextContent("Username");
    expect(headers[1]).toHaveTextContent("Name");
    // Add assertions for other headers
  });

  it("renders trainer details", async () => {
    render(<TrainersDetails />);
    const companyNames = screen.getAllByText(/^[A-Za-z\s]+$/);
    expect(companyNames).not.toHaveLength(0);
  });
});
