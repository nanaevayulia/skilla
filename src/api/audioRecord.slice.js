import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  audioRecord: null,
  isPlaying: false,
};

export const audioRecordSlice = createSlice({
  name: 'audioRecord',
  initialState,
  reducers: {
    setRecord(state, action) {
      state.id = action.payload.id;
      state.audioRecord = action.payload.audioRecord;
      state.isPlaying = action.payload.isPlaying;
    },
  },
});

export const audioRecordReducer = audioRecordSlice.reducer;
export const audioRecordActions = audioRecordSlice.actions;
