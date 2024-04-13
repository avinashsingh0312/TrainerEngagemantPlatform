//BusinessRegister.test.js
 
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BusinessRegister from '../../pages/business/BusinessRegister';

 
describe('BusinessRegister Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <BusinessRegister />
      </MemoryRouter>
    );
 
    // Check if the component renders without crashing
    expect(screen.getByText('Company Registration')).toBeInTheDocument();
  });
 
  it('submits the form without validation errors', async () => {
    // Mocking a successful registration response
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
 
    render(
      <MemoryRouter>
        <BusinessRegister />
      </MemoryRouter>
    );
 
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Company Name'), { target: { value: 'TestCompany' } });
    // ... (Simulate input for other fields)
 
    // Trigger form submission
    fireEvent.click(screen.getByText('Register'));
 
    // Wait for asynchronous operations to complete
    await act(async () => {});
 
   
  });
});
 