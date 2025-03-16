import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useGetCallsMutation } from '../../api/calls.api';
import { useActions } from '../../redux/actions';
import Header from '../header';
import Call from '../call';
import { Spinner, Error } from '../UI';
import { today } from '../../utils/constants';

import style from './call-list.module.scss';

export default function CallList({ isLoading, isError }) {
  const [sortedByTime, setSortedByTime] = useState('ASC');
  const [sortedByDuration, setSortedByDuration] = useState('ASC');
  const [todaysCalls, setTodaysCalls] = useState([]);
  const [yesterdaysCalls, setYesterdayCalls] = useState([]);
  const [earlierCalls, setEarlierCalls] = useState([]);

  const callFilterState = useSelector((state) => state.callFilter);
  const callsState = useSelector((state) => state.callsList.list);

  const { setCalls } = useActions();
  const [getCalls, { isLoading: loadingFilters, isError: errorFilters }] = useGetCallsMutation();

  useEffect(() => {
    filterByDate(callsState);
  }, [callsState]);

  const handleSortByTime = async () => {
    setSortedByTime(sortedByTime === 'ASC' ? 'DESC' : 'ASC');

    try {
      const response = await getCalls({
        order: sortedByTime,
        sort_by: 'date',
        in_out: callFilterState.id,
      }).unwrap();
      setCalls(response?.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSortByDuration = async () => {
    setSortedByDuration(sortedByDuration === 'ASC' ? 'DESC' : 'ASC');

    try {
      const response = await getCalls({
        order: sortedByDuration,
        sort_by: 'duration',
        in_out: callFilterState.id,
      }).unwrap();
      setCalls(response?.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const date = new Date();
  const yesterday = new Date();
  yesterday.setDate(date.getDate() - 1);

  function filterByDate(array) {
    const todayArray = array?.filter(({ date_notime }) => date_notime === today);
    const yesterdayArray = array?.filter(({ date_notime }) => date_notime === yesterday.toISOString().slice(0, 10));
    const earlierArray = array?.filter(
      ({ date_notime }) => date_notime !== today && date_notime !== yesterday.toISOString().slice(0, 10)
    );

    return setTodaysCalls(todayArray), setYesterdayCalls(yesterdayArray), setEarlierCalls(earlierArray);
  }

  const getRandomGrade = () => {
    const grades = ['Excellent', 'Good', 'Bad', 'Not Used'];
    const randomGrade = Math.floor(Math.random() * grades.length);
    return grades[randomGrade];
  };

  const createCallsList = (callsList, day) => {
    return (
      callsList &&
      callsList.length !== 0 && (
        <li key={day}>
          {callsList !== todaysCalls && (
            <div className={style['day-list']}>
              {day} <sup>{callsList.length}</sup>
            </div>
          )}
          <ul>
            {callsList.map((item) => (
              <li key={item.id} className={style['call-list__day']}>
                <Call props={item} randomGrade={getRandomGrade()} />
              </li>
            ))}
          </ul>
        </li>
      )
    );
  };

  const arrayCallsList = [
    { callsList: todaysCalls, day: 'Сегодня' },
    { callsList: yesterdaysCalls, day: 'Вчера' },
    { callsList: earlierCalls, day: 'Ранее' },
  ];

  return (
    <div className={style['call-list']}>
      <Header
        sortByTime={handleSortByTime}
        sortByDuration={handleSortByDuration}
        timeDirection={sortedByTime}
        durationDirection={sortedByDuration}
      />
      {(isLoading || loadingFilters) && <Spinner />}
      {(isError || errorFilters) && <Error />}
      {!isLoading && !loadingFilters && !isError && !errorFilters && callsState && callsState.length !== 0 && (
        <ul className={style['call-list__days']}>
          {arrayCallsList.map(({ callsList, day }) => createCallsList(callsList, day))}
        </ul>
      )}
    </div>
  );
}
