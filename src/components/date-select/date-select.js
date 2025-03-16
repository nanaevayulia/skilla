/* eslint-disable indent */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '../../redux/actions';
import { useGetCallsMutation } from '../../api/calls.api';
import useOutsideClick from '../../utils/useOutsideClick';
import { today, threeDays, week, month, year } from '../../utils/constants';
import { Arrow, IconCalendar } from '../../assets/icons';

import style from './date-select.module.scss';

export default function DateSelect({ setLoading, setError }) {
  const [isOpen, setIsOpen] = useState(false);
  const callFilterState = useSelector((state) => state.callFilter);
  const dateFilterState = useSelector((state) => state.dateFilter);
  const [getCalls, { isLoading, isError }] = useGetCallsMutation();
  const { setCalls, setDateFilter } = useActions();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const timePeriod = [
    { date_start: threeDays, date_end: today, text: '3 дня' },
    { date_start: week, date_end: today, text: 'Неделя' },
    { date_start: month, date_end: today, text: 'Месяц' },
    { date_start: year, date_end: today, text: 'Год' },
  ];

  const onDateFocus = (e) => (e.target.type = 'date');
  const onDateBlur = (e) => (e.target.type = 'text');

  const handleDateClick = async ({ date_start, date_end, text = '3 дня' }) => {
    setDateFilter({ date_start, date_end, text });
    setIsOpen(false);

    try {
      const response = await getCalls({ date_start, date_end, in_out: callFilterState.id }).unwrap();
      setCalls(response?.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDateFormClick = (e) => {
    e.preventDefault();
    handleDateClick({
      ...dateFilterState,
      date_start: e.target[0].value,
      date_end: e.target[1].value,
    });
    setDateFilter({
      ...dateFilterState,
      date_start: e.target[0].value,
      date_end: e.target[1].value,
      text: `${e.target[0].value} - ${e.target[1].value}`,
    });
  };

  const handleClickLeft = () => {
    let newDateStart;
    let newText;

    switch (dateFilterState.date_start) {
      case week:
        newDateStart = threeDays;
        newText = '3 дня';
        break;
      case month:
        newDateStart = week;
        newText = 'Неделя';
        break;
      case year:
        newDateStart = month;
        newText = 'Месяц';
        break;
      default:
        newDateStart = threeDays;
        newText = '3 дня';
    }

    handleDateClick({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
    });
    setDateFilter({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
      text: newText,
    });
  };

  const handleClickRight = () => {
    let newDateStart;
    let newText;

    switch (dateFilterState.date_start) {
      case threeDays:
        newDateStart = week;
        newText = 'Неделя';
        break;
      case week:
        newDateStart = month;
        newText = 'Месяц';
        break;
      case month:
        newDateStart = year;
        newText = 'Год';
        break;
      default:
        newDateStart = year;
        newText = 'Год';
    }

    handleDateClick({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
    });
    setDateFilter({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
      text: newText,
    });
  };

  return (
    <div className={style['date-select']} ref={ref}>
      <button
        className={style['date-select__button']}
        onClick={() => handleClickLeft()}
        disabled={dateFilterState.text === '3 дня'}
      >
        <Arrow direction="270deg" />
      </button>
      <button
        className={`${style['date-select__button']} ${style['date-select__period']}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconCalendar /> {dateFilterState.text}
      </button>
      <button
        className={style['date-select__button']}
        onClick={() => handleClickRight()}
        disabled={dateFilterState.text === 'Год'}
      >
        <Arrow direction="90deg" />
      </button>
      {isOpen && (
        <div className={style['select-list']}>
          <ul>
            {timePeriod.map((el) => (
              <li
                key={el.text}
                className={`${style['select-list__item']} ${dateFilterState.text === el.text && style['select-list__item_active']}`}
                onClick={() => handleDateClick(el)}
              >
                {el.text}
              </li>
            ))}
          </ul>

          <form className={style['select-list__form']} onSubmit={(e) => handleDateFormClick(e)}>
            <p className={style['select-list__label']}>Указать даты</p>
            <div className={style['select-list__inputs']} id="inputs">
              <input
                type="text"
                id="date_start"
                name="date_start"
                placeholder="__.__.__"
                onFocus={onDateFocus}
                onBlur={onDateBlur}
                required
              />
              <span>-</span>
              <input
                type="text"
                id="date_end"
                name="date_end"
                placeholder="__.__.__"
                onFocus={onDateFocus}
                onBlur={onDateBlur}
                required
              />
              <button type="submit" className={style['date-select__submit']} />
              <IconCalendar />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
