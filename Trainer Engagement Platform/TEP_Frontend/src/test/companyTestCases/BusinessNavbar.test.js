//BusinessNavbar.test.js
 
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BusinessNavbar from '../../pages/business/BusinessNavbar';

 
describe('BusinessNavbar Component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <BusinessNavbar />
      </BrowserRouter>
    );
 
    // Check if the text "Sharath-InfoTech" is present
    expect(screen.getByText('Sharath-InfoTech')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
 
   
  });
});