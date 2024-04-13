import React from 'react';
import { render } from '@testing-library/react';
import CurrentTrainings  from '../../pages/business/CurrentTrainings';

 
describe('CurrentTrainings component', () => {
  it('renders without crashing', () => {
    render(<CurrentTrainings />);
  });
 
  it('renders table headers correctly', () => {
    const { getByText } = render(<CurrentTrainings />);
    expect(getByText('Company Name')).toBeInTheDocument();
    expect(getByText('Amount')).toBeInTheDocument();
    expect(getByText('Batches')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('End Date')).toBeInTheDocument();
    expect(getByText('Technologies')).toBeInTheDocument();
    expect(getByText('Payment Status')).toBeInTheDocument();
  });
 
 
});
 
 