import React from "react";
import { render } from "@testing-library/react";
import PurchaseOrderComponent from "../../pages/admin/PurchaseOrderComponent";

describe("BusinessRequest component", () => {
  it("renders without crashing", () => {
    render(<PurchaseOrderComponent />);
  });
});
