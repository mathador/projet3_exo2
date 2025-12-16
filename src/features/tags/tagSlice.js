import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action) => {
        state.items = action.payload.data;
        state.status = 'succeeded';
    },
    setTagStatus: (state, action) => {
        state.status = action.payload;
    }
  },
});

export const { setTags, setTagStatus } = tagsSlice.actions;
export default tagsSlice.reducer;
