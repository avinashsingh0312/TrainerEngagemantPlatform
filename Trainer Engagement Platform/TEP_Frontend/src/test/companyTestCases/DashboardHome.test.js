//DashboardHome.test.js
 
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import DashboardHome from '../../pages/business/DashboardHome';

 
describe('DashboardHome Component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <DashboardHome />
      </BrowserRouter>
    );
 
    // Check if the component renders without crashing
    expect(screen.getByText('Dashboard of')).toBeInTheDocument();
    expect(screen.getByText('No of Invoice Request')).toBeInTheDocument();
    expect(screen.getByText('Trainings')).toBeInTheDocument();
 
 
    // You can add more specific checks based on your component content
  });
});
 