import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: undefined,
  text: 'Все типы',
};

export const callFilterSlice = createSlice({
  name: 'callFilter',
  initialState,
  reducers: {
    setCallFilter(state, action) {
      state.id = action.payload.id;
      state.text = action.payload.text;
    },
  },
});

export const callFilterReducer = callFilterSlice.reducer;
export const callFilterActions = callFilterSlice.actions;
