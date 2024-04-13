export const fetchInvoices = (businessEmail) => async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/businessinvoices/${businessEmail}`);
      if (!response.ok) {
        throw new Error(`Error fetching invoices: ${response.statusText}`);
      }
 
      const data = await response.json();
      dispatch({ type: 'FETCH_INVOICES_SUCCESS', payload: data });
    } catch (error) {
      console.error(error);
    }
  };