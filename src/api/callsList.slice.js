import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const callsListSlice = createSlice({
  name: 'callsList',
  initialState,
  reducers: {
    setCalls(state, action) {
      state.list = action.payload;
    },
  },
});

export const callsListReducer = callsListSlice.reducer;
export const callsListActions = callsListSlice.actions;
