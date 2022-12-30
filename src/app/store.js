import { configureStore } from '@reduxjs/toolkit';
import fetchDropdownReducer from '../features/fetchdropdown/fetchDropdownSlice';

export const store = configureStore({
  reducer: {
    fetchDropdownReducer,
  },
});
