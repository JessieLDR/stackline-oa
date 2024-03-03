import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

// Define AppDispatch type which includes thunk actions
export type AppDispatch = typeof store.dispatch;

// Define RootState type which represents the state of the entire Redux store
export type RootState = ReturnType<typeof store.getState>;

export default store;


