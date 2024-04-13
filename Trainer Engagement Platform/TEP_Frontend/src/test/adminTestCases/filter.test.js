import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrainersFilterPage from "../../pages/admin/TrainersFilterPage";

test("clicking the filter button should call handleFilter function", async () => {
  // Render the component
  render(<TrainersFilterPage />);

  // Mock the fetch function to prevent actual network requests
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  // Simulate user input by typing in the filter inputs
  fireEvent.change(screen.getByLabelText("Filter by Skills:"), {
    target: { value: "React" },
  });
  fireEvent.change(screen.getByLabelText("Filter by Charge/Day:"), {
    target: { value: "50" },
  });

  // Simulate button click
  fireEvent.click(screen.getByText("Filter"));

  // Ensure that handleFilter function is called
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
