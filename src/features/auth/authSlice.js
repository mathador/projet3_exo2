import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import apiSanctum from '../../services/apiSanctum';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // First, get CSRF token (if using web routes or if needed for SPA authentication)
      // This might vary based on your Laravel Sanctum setup
      await apiSanctum.get('/sanctum/csrf-cookie');
      // const sanctumResponse = await apiSanctum.get('/sanctum/csrf-cookie');
      // console.log(sanctumResponse.data); // For debugging CSRF cookie retrieval

      const response = await api.post('/auth/login', { email, password });
      // Assuming Laravel /login endpoint returns user data and/or sets cookies for Sanctum
      // If it returns a token, store it.
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data.user || { email: email }; // Return user info
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');
      return true;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: localStorage.getItem('authToken') ? { email: 'authenticated' } : null, // Simple check if token exists
  isAuthenticated: !!localStorage.getItem('authToken'),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
