import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import BusinessRequestDetails from "../../pages/admin/BusinessRequestDetails";

describe("BusinessRequest component", () => {
  it("renders without crashing", () => {
    render(<BusinessRequestDetails />);
  });
});
