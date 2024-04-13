import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import BusinessDashboard from '../../pages/business/BusinessDashboard';

 
test('renders BusinessDashboard component', async () => {
  render(
    <MemoryRouter>
      <BusinessDashboard />
    </MemoryRouter>
  );
 
  const dashboardTab = screen.getByText('Dashboard');
  const myProfileTab = screen.getByText('My Profile');
 
  expect(dashboardTab).toBeInTheDocument();
  expect(myProfileTab).toBeInTheDocument();
});
 