import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RevenueAnalysisPage from "../../pages/admin/RevenueAnalysisPage";

describe("RevenueAnalysisPage Component", () => {
  test("renders Quarterly Revenue Analysis text", () => {
    render(<RevenueAnalysisPage />);
    const quarterlyRevenueAnalysisText = screen.getByText(
      "Quarterly Revenue Analysis"
    );
    expect(quarterlyRevenueAnalysisText).toBeInTheDocument();
  });
});
