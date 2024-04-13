import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // or any other middleware you need
import trainerReducer from "./reducers/TrainerRegister";
import trainingReducer from './reducers/currentTrainingReducer';

export const store = configureStore({
  reducer: {
    trainer: trainerReducer,
    training: trainingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    // Add reducers for other features if needed
});

 