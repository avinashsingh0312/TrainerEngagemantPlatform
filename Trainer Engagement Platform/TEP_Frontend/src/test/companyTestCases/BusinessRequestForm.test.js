// BusinessRequestForm.test.js
 
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BusinessRequestForm from '../../pages/business/BusinessRequestForm';

 
test('renders BusinessRequestForm component', () => {
  render(<BusinessRequestForm />);
});