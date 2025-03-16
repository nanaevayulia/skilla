import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '../../redux/actions';
import { useGetCallsMutation } from '../../api/calls.api';
import useOutsideClick from '../../utils/useOutsideClick';
import { Arrow, Cross } from '../../assets/icons';

import style from './call-select.module.scss';

export default function CallSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const callFilterState = useSelector((state) => state.callFilter);
  const { setCallFilter, setCalls } = useActions();
  const [getCalls] = useGetCallsMutation();

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const callsTypes = [
    { id: undefined, text: 'Все типы' },
    { id: '1', text: 'Входящие' },
    { id: '0', text: 'Исходящие' },
  ];

  const handleTypeClick = async (id, text) => {
    setIsOpen(false);
    setCallFilter({ id, text });

    try {
      const response = await getCalls({ in_out: id }).unwrap();
      setCalls(response?.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const resetType = async () => {
    setIsOpen(false);
    setCallFilter({ id: undefined, text: 'Все типы' });

    try {
      const response = await getCalls({}).unwrap();
      setCalls(response?.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={style['call-select']} ref={ref}>
      <button
        className={`${style['set-filter']} ${callFilterState.id !== undefined && style['set-filter_active']}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {callFilterState.text} <Arrow direction={isOpen ? '0deg' : '180deg'} />
      </button>
      {isOpen && (
        <ul className={style['select-list']}>
          {callsTypes.map(({ id, text }, index) => (
            <li
              key={index}
              className={`${style['select-list__item']} ${callFilterState.id === id && style['select-list__item_active']}`}
              onClick={() => handleTypeClick(id, text)}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
      {callFilterState.id !== undefined && (
        <button className={style['reset-filter']} onClick={() => resetType()}>
          Сбросить фильтры
          <Cross />
        </button>
      )}
    </div>
  );
}
