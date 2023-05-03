import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';

const store = configureStore({
  reducer: {
    form: formSlice,
  },
  initialState: {
    form: {
      ...formSlice.initialState,
    },
  },
});

export default store;
