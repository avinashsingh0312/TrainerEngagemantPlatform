import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MyTrainings from '../../pages/trainer/MyTrainings';
 
jest.mock('@react-pdf/renderer', () => ({
    Document: jest.fn().mockReturnValue(null),
    Page: jest.fn().mockReturnValue(null),
    Text: jest.fn().mockReturnValue(null),
    View: jest.fn().mockReturnValue(null),
    pdf: {
      toBlob: jest.fn().mockResolvedValue(null),
    },
    StyleSheet: {
      create: jest.fn().mockReturnValue(null),
    },
  }));
 
describe('MyTrainings Component', () => {
  const mockTrainings = [
    {
      _id: 1,
      businessId: 'B123',
      trainerEmail: 'test@example.com',
      amount: 100,
      status: false,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      raiseStatus: false,
      invoiceId: null,
    },
    // Add more mock training data as needed
  ];
 
  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTrainings),
    });
  });
 
  test('renders component correctly', async () => {
    render(<MyTrainings email="test@example.com" />);
 
    // Check if the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
 
    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
 
    // Check if the component renders without errors
    expect(screen.getByText('My Trainings')).toBeInTheDocument();
    expect(screen.getByText('Business ID: B123')).toBeInTheDocument();
    // Add more assertions as needed
  });
 
  test('handles filter change', async () => {
    render(<MyTrainings email="test@example.com" />);
 
    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
 
    // Find and click the filter button
    const filterButton = screen.getByText('Current Trainings');
    fireEvent.click(filterButton);
 
    // Check if the component updates according to the filter change
    expect(screen.getByText('Current Trainings')).toBeInTheDocument();
    // Add more assertions as needed
  });
 
 
});
 