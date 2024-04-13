import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import FeedbackForm from '../../pages/business/FeedbackForm';

 
test("testing signin form", () => {
  render(<FeedbackForm />);
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  expect(inputs).toHaveLength(4);
  expect(button).toBeInTheDocument();
});