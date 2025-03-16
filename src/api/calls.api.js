import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { today, threeDays } from '../utils/constants';

const _baseUrl = 'https://api.skilla.ru/mango';
const _token = 'testtoken';

const callsListApi = createApi({
  reducerPath: 'callsListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: _baseUrl,
    headers: {
      Authorization: `Bearer ${_token}`,
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getCalls: builder.mutation({
      query: ({ date_start = threeDays, date_end = today, in_out = undefined, sort_by = 'date', order = 'DESC' }) => ({
        url: '/getList',
        method: 'POST',
        params: {
          date_start,
          date_end,
          in_out,
          sort_by,
          order,
        },
      }),
    }),
    getRecord: builder.mutation({
      query: ({ record, partnership_id }) => ({
        url: '/getRecord',
        method: 'POST',
        params: {
          record,
          partnership_id,
        },
        headers: {
          Authorization: `Bearer ${_token}`,
          'Content-Type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
          'Content-Transfer-Encoding': 'binary',
          'Content-Disposition': 'record.mp3',
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { useGetCallsMutation, useGetRecordMutation } = callsListApi;
export default callsListApi;
