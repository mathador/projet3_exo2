import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/notes/noteSlice';
import tagReducer from '../features/tags/tagSlice';
import authReducer from '../features/auth/authSlice';
import { api } from '../services/api';
import { apiCsrf } from '../services/apiCsrf';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    tags: tagReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [apiCsrf.reducerPath]: apiCsrf.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, apiCsrf.middleware),
});
