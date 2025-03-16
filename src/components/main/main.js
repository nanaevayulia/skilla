import { useEffect, useLayoutEffect } from 'react';

import { useActions } from '../../redux/actions';
import { useGetCallsMutation } from '../../api/calls.api';
import CallSelect from '../call-select';
import DateSelect from '../date-select';
import CallList from '../call-list';

import style from './main.module.scss';

export default function Main() {
  const { setCalls } = useActions();
  const [getCalls, { data, isLoading }] = useGetCallsMutation();

  useLayoutEffect(() => {
    getCalls({});
  }, []);

  useEffect(() => {
    setCalls(data?.results);
  }, [data]);

  return (
    <div className={style.main}>
      <div className={style.selections}>
        <CallSelect />
        <DateSelect />
      </div>
      <CallList isLoading={isLoading} />
    </div>
  );
}
