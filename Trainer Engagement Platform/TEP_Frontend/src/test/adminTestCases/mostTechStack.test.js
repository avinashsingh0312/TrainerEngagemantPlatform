import React from "react";
import { render } from "@testing-library/react";
import MostTechStackSell from "../../pages/admin/MostTechStackSell";

describe("BusinessRequest component", () => {
  it("renders without crashing", () => {
    render(<MostTechStackSell />);
  });
});
