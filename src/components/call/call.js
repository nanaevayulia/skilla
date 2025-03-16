/* eslint-disable indent */
import { useState } from 'react';

import AudioRecord from '../audio-record/audio-record';
import incoming from '../../assets/images/icon-incoming.svg';
import missed from '../../assets/images/icon-missed.svg';
import outgoing from '../../assets/images/icon-outgoing.svg';
import noncall from '../../assets/images/icon-noncall.svg';
import avatar from '../../assets/images/avatar.svg';

import style from './call.module.scss';

export default function Call({ props, randomGrade }) {
  const {
    id,
    partnership_id,
    date,
    time,
    from_number,
    to_number,
    status,
    record,
    in_out,
    source,
    contact_name,
    contact_company,
    person_avatar,
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const getTypeOfCall = (status, in_out) => {
    if (status === 'Дозвонился') {
      if (in_out === 0) {
        return { typeOfCallImg: outgoing, alt: 'Исходящий вызов' };
      } else {
        return { typeOfCallImg: incoming, alt: 'Входящий вызов' };
      }
    } else {
      if (in_out === 0) {
        return { typeOfCallImg: noncall, alt: 'Не дозвонился' };
      } else {
        return { typeOfCallImg: missed, alt: 'Пропущенный вызов' };
      }
    }
  };

  const getTimeOfCall = (date) => {
    if (date) {
      return date.slice(11, 16);
    }
  };

  const getTypeOfNumber = (in_out) => {
    if (in_out === 0) {
      return to_number;
    } else {
      return from_number;
    }
  };

  const getGrade = (random) => {
    switch (random) {
      case 'Excellent':
        return { gradeStyle: 'call-grade-green', text: 'Отлично' };
      case 'Good':
        return { gradeStyle: 'call-grade-gray', text: 'Хорошо' };
      case 'Bad':
        return { gradeStyle: 'call-grade-red', text: 'Плохо' };
      case 'Not Used':
      default:
        return {
          gradeStyle: 'call-grade-script',
          text: 'Скрипт не использован',
        };
    }
  };

  const formatDuration = (duration) => {
    if (duration > 0) {
      const minutes = String(Math.floor(duration / 60));
      const seconds = String(duration - minutes * 60);
      return `${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`;
    }
  };

  return (
    <div className={style.call} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={style['call-type']}>
        <img src={getTypeOfCall(status, in_out).typeOfCallImg} alt={getTypeOfCall(status, in_out).alt} />
      </div>
      <div className={style['call-time']}>{getTimeOfCall(date)}</div>
      <img src={person_avatar ? person_avatar : avatar} alt="avatar" className={style['call-avatar']} />
      <div className={style['call-tel']}>
        <span className={style['call-name']}>{contact_name || getTypeOfNumber(in_out)}</span>
        {contact_company && <span className={style['call-company']}>{contact_company}</span>}
      </div>
      <div className={style['call-source']}>{source && source}</div>
      <div>
        {status !== 'Не дозвонился' && (
          <div className={`${style['call-grade']} ${style[getGrade(randomGrade).gradeStyle]}`}>
            {getGrade(randomGrade).text}
          </div>
        )}
      </div>
      <div className={style['call-record']}>
        <AudioRecord
          id={id}
          time={formatDuration(time)}
          isHovered={isHovered}
          record={record}
          partnership_id={partnership_id}
        />
      </div>
    </div>
  );
}
