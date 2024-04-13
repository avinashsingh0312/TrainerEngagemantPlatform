import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TrainerRegister from '../../pages/trainer/TrainerRegister';
 
 
test("testing my trainer registration form", () => {
  render
  (
    <BrowserRouter>(<TrainerRegister />)</BrowserRouter>
 
  );
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');
  expect(inputs).toHaveLength(7);
  expect(button).toBeInTheDocument();
 
 
 
});