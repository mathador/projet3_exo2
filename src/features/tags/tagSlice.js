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
    },
    addTag: (state, action) => {
      state.items.push(action.payload);
    },
    removeTag: (state, action) => {
      state.items = state.items.filter(tag => tag.id !== action.payload);
    },
  },
});

export const {
  setTags,
  setTagStatus,
  addTag,
  removeTag
} = tagsSlice.actions;
export default tagsSlice.reducer;
