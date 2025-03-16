import { useEffect, useLayoutEffect, useState } from 'react';

import { useActions } from '../../redux/actions';
import { useGetCallsMutation } from '../../api/calls.api';
import CallSelect from '../call-select';
import DateSelect from '../date-select';
import CallList from '../call-list';

import style from './main.module.scss';

export default function Main() {
  const { setCalls } = useActions();
  const [getCalls, { data, isLoading, isError }] = useGetCallsMutation();
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState(isError);

  useLayoutEffect(() => {
    getCalls({});
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  useEffect(() => {
    setCalls(data?.results);
  }, [data]);

  return (
    <div className={style.main}>
      <div className={style.selections}>
        <CallSelect setLoading={setLoading} setError={setError} />
        <DateSelect setLoading={setLoading} setError={setError} />
      </div>
      <CallList isLoading={loading} isError={error} />
    </div>
  );
}
