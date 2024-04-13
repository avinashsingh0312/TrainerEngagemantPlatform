import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyProfile from '../../pages/trainer/MyProfile';
 
// Mock the fetch function to simulate API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      username: 'avinashsingh09',
      Name: 'Avinash Singh',
      Email: 'avinash123@gmail.com',
      Contact:8080888958,
      skills: 'Java , Reactjs , Nodejs, MongoDB',
      city:'Navi Mumbai',
      ChargePerDay:200,
      TrainerType:'full-time',
      OpenToTravel:"Yes",
      DeliveryMode:"Offline",
      Clients:"",
      Resume:"",
      LinkedInUrl:""
 
 
      // Include other fields as needed
      // ...
    }),
    ok: true,
  })
);
 
// Mock the swal function
jest.mock('sweetalert', () => ({
  __esModule: true,
  default: jest.fn(),
}));
 
describe('MyProfile component', () => {
  const mockEmail = 'test@example.com';
 
  test('renders MyProfile component with default data', async () => {
    render(<MyProfile email={mockEmail} />);
   
    // Assuming your component has some initial data
    // You can modify this based on your actual component's behavior
    await waitFor(() => {
      expect(screen.getByText('My Profile')).toBeInTheDocument();
      // Add more assertions for initial data rendering
    });
  });
 
  test('handles edit button click and changes to edit mode', async () => {
    render(<MyProfile email={mockEmail} />);
   
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
   
    await waitFor(() => {
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });
 
  test('updates TrainerName field in edit mode', async () => {
    render(<MyProfile email={mockEmail} />);
   
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
   
  });
 
  // Add similar test cases for other fields
 
  test('handles cancel button click and reverts to view mode', async () => {
    render(<MyProfile email={mockEmail} />);
   
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
 
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
 
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });
 
 
  // Cleanup after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});
 