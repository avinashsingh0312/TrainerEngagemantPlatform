import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompaniesDetails from "../../pages/admin/CompaniesDetails";

describe("CompaniesDetails Component", () => {
  it("renders without crashing", () => {
    render(<CompaniesDetails />);
  });

  it("renders table headers correctly", async () => {
    render(<CompaniesDetails />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(7);
    expect(headers[0]).toHaveTextContent("Unique ID");
    expect(headers[1]).toHaveTextContent("Company Name");
    // Add assertions for other headers
  });

  it("renders company details", async () => {
    render(<CompaniesDetails />);
    const companyNames = screen.getAllByText(/^[A-Za-z\s]+$/);
    expect(companyNames).not.toHaveLength(0);
  });
});
