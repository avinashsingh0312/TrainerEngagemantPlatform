// currentTrainingReducer.js
const initialState = {
    invoices: [],
  };
 
  const currentTrainingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_INVOICES_SUCCESS':
        return { ...state, invoices: action.payload };
      default:
        return state;
    }
  };
 
  export default currentTrainingReducer;
 