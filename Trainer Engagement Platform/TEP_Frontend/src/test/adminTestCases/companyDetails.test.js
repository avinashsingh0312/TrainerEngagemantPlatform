import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import CompaniesDetails from "../../pages/admin/CompaniesDetails";

describe("BusinessRequest component", () => {
  it("renders without crashing", () => {
    render(<CompaniesDetails />);
  });
  test("renders table headers", async () => {
    render(<CompaniesDetails />);
    const headers = screen.getByRole("heading");
    expect(headers).toBeInTheDocument();
  });
});
