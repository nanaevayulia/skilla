import { Arrow } from '../../assets/icons';

import style from './header.module.scss';

export default function Header({ sortByTime, sortByDuration, timeDirection, durationDirection }) {
  return (
    <div className={style.header}>
      <div>Тип</div>
      <button className={style['header-time']} onClick={() => sortByTime()}>
        Время
        <Arrow direction={timeDirection === 'ASC' ? '180deg' : '0deg'} />
      </button>
      <div>Сотрудник</div>
      <div>Звонок</div>
      <div>Источник</div>
      <div>Оценка</div>
      <button className={style['header-duration']} onClick={() => sortByDuration()}>
        Длительность
        <Arrow direction={durationDirection === 'ASC' ? '180deg' : '0deg'} />
      </button>
    </div>
  );
}
