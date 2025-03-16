import { createSlice } from '@reduxjs/toolkit';

import { today, threeDays } from '../utils/constants';

const initialState = {
  date_start: threeDays,
  date_end: today,
  text: '3 дня',
};

export const dateFilterSlice = createSlice({
  name: 'dateFilter',
  initialState,
  reducers: {
    setDateFilter(state, action) {
      state.date_start = action.payload.date_start;
      state.date_end = action.payload.date_end;
      state.text = action.payload.text;
    },
  },
});

export const dateFilterReducer = dateFilterSlice.reducer;
export const dateFilterActions = dateFilterSlice.actions;
