import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/notes/noteSlice';
import tagReducer from '../features/tags/tagSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    tags: tagReducer,
    auth: authReducer,
  },
});