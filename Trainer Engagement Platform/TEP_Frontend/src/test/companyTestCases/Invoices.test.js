import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Invoices from '../../pages/business/Invoices';
 
test('renders business invoices correctly', () => {
  const { getByText } = render(<Invoices email="example@example.com" />);
 
  expect(getByText('Business Invoices')).toBeInTheDocument();
});
 