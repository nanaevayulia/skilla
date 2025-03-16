import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetRecordMutation } from '../../api/calls.api';
import { useActions } from '../../redux/actions';
import { Download, Cross, Pause, Play } from '../../assets/icons';

import style from './audio-record.module.scss';

export default function AudioRecord({ id, time, isHovered, record, partnership_id }) {
  const [isDownload, setIsDownload] = useState(false);
  const [progress, setProgress] = useState(0);
  const recordState = useSelector((state) => state.audioRecord);
  const { audioRecord, isPlaying } = recordState;

  const [getRecord] = useGetRecordMutation();
  const { setRecord } = useActions();

  useEffect(() => {
    if (audioRecord && recordState.id === id) {
      audioRecord.addEventListener('timeupdate', updateProgress);
      audioRecord.addEventListener('ended', handleAudioEnd);

      return () => {
        audioRecord.removeEventListener('timeupdate', updateProgress);
        audioRecord.removeEventListener('ended', handleAudioEnd);
        URL.revokeObjectURL(audioRecord);
      };
    } else {
      setIsDownload(false);
      setProgress(0);
    }
  }, [audioRecord]);

  const updateProgress = () => {
    if (audioRecord && recordState.id === id) {
      const progress = (audioRecord.currentTime / audioRecord.duration) * 100;
      setProgress(progress);
    }
  };

  const handleAudioEnd = () => {
    setRecord({ ...recordState, isPlaying: false });
    setProgress(0);
  };

  const handlePlay = () => {
    if (audioRecord && recordState.id === id) {
      if (isPlaying) {
        audioRecord.pause();
      } else {
        audioRecord.play();
      }
      setRecord({ ...recordState, isPlaying: !isPlaying });
    } else {
      console.log('Звонок не был получен.');
    }
  };

  const handleDownload = async () => {
    if (id !== recordState.id) {
      if (isPlaying) {
        audioRecord.pause();
        setProgress(0);
        setRecord({ ...recordState, isPlaying: false });
        URL.revokeObjectURL(audioRecord);
      }
      setIsDownload(false);
      const response = await getRecord({ record, partnership_id });
      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      setRecord({ id: id, audioRecord: audio, isPlaying: false });
      setProgress(0);
      setIsDownload(true);
    }
  };

  function handleClearAudio() {
    if (audioRecord && recordState.id === id) {
      audioRecord.pause();
      audioRecord.src = '';
      setRecord({ id: '', audioRecord: null, isPlaying: false });
      setProgress(0);
      setIsDownload(false);
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    if (audioRecord) {
      audioRecord.currentTime = (percentage / 100) * audioRecord.duration;
      setProgress(percentage);
    }
  };

  return (
    <>
      {isHovered && record ? (
        <div className={style.record}>
          <p className={style['record__time']}>{time}</p>
          <button className={style['record__playBtn']} onClick={handlePlay}>
            {isPlaying && recordState.id === id ? <Pause /> : <Play />}
          </button>
          <div
            className={style['record__audioline']}
            onClick={handleSeek}
            style={{
              background: `linear-gradient(to right, #002CFB ${progress}%, #ADBFDF ${progress}%)`,
            }}
          ></div>
          <button
            className={style['record__download']}
            onClick={handleDownload}
            disabled={isPlaying && id === recordState.id}
          >
            <Download />
          </button>
          <button className={style['record__close']} onClick={handleClearAudio} disabled={!isDownload}>
            {isDownload && <Cross />}
          </button>
        </div>
      ) : (
        <p className={style['call-duration']}>{time}</p>
      )}
    </>
  );
}
