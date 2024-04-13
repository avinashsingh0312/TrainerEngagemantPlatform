import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PODetails from '../../pages/trainer/PODetails';
  
describe('PODetails Component', () => {
    // Dummy data for testing
    const dummyPurchaseOrders = [
      {
        _id: 1,
        businessRequestId: 'B123',
        trainerEmail: 'test@example.com',
        amount: 100,
        status: false,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      },
      // Add more dummy data as needed
    ];
 
    test('renders component correctly', async () => {
      render(<PODetails email="test@example.com" />);
     
      // Wait for the loading indicator to disappear
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
 
      // Check if the component renders without errors
      const purchaseOrdersTitle = screen.getByText('Purchase Orders');
      expect(purchaseOrdersTitle).toBeInTheDocument();
    });
 
    test('handles accept button click', async () => {
      // Mock the fetch request to return dummy data
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => dummyPurchaseOrders,
      });
 
      render(<PODetails email="test@example.com" />);
     
      // Wait for the component to fetch data and render
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.queryByText('Failed to fetch data. Please try again later.')).not.toBeInTheDocument();
      });
 
      // Find and click the accept button
      const acceptButton = screen.getByText('Accept');
      fireEvent.click(acceptButton);
 
      // Write assertions for the fetch call, etc.
    });
 
    test('handles reject button click', async () => {
      // Mock the fetch request to return dummy data
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => dummyPurchaseOrders,
      });
 
      render(<PODetails email="test@example.com" />);
     
      // Wait for the component to fetch data and render
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.queryByText('Failed to fetch data. Please try again later.')).not.toBeInTheDocument();
      });
 
      // Find and click the reject button
      const rejectButton = screen.getByText('Reject');
      fireEvent.click(rejectButton);
 
      // Write assertions for the fetch call, etc.
    });
  });
 