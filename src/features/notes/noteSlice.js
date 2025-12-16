import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
        state.items = action.payload.data;
        state.status = 'succeeded';
    },
    setNoteStatus: (state, action) => {
        state.status = action.payload;
    }
  },
});

export const { setNotes, setNoteStatus } = notesSlice.actions;
export default notesSlice.reducer;