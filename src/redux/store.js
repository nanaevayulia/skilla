import { configureStore } from '@reduxjs/toolkit';

import callsListApi from '../api/calls.api';
import { callFilterReducer } from '../api/callFilter.slice';
import { callsListReducer } from '../api/callsList.slice';
import { dateFilterReducer } from '../api/dateFilter.slice';
import { audioRecordReducer } from '../api/audioRecord.slice';

export const store = configureStore({
  reducer: {
    [callsListApi.reducerPath]: callsListApi.reducer,
    callFilter: callFilterReducer,
    callsList: callsListReducer,
    dateFilter: dateFilterReducer,
    audioRecord: audioRecordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(callsListApi.middleware),
});
