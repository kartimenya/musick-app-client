import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ITrack } from '../models/track';
import {
  pauseTrack,
  playTrack,
  setActiveTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from '../store/slices/player';
import styles from '../styles/Player.module.css';
import TrackProgress from './TrackProgress';

let audio: HTMLAudioElement;
let prevTrack: ITrack | null;

const Player = () => {
  const { pause, activeTrack, volume, duration, currentTime } = useAppSelector(
    (state) => state.player,
  );
  const dispatch = useAppDispatch();
  const track = {
    _id: '1',
    artist: 'Artist-1',
    audio: 'http://localhost:5000/audio/0bb070b6-9113-44bd-b4f2-c362b9e88a13.mp3',
    name: 'name-1',
    listens: 1,
    text: 'text-1',
    picture: 'ds',
    coments: [],
  };

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
  }, []);

  useEffect(() => {
    if (activeTrack) {
      if (activeTrack?._id !== prevTrack?._id && pause === false) {
        audio.src = activeTrack?.audio;
        audio.onloadedmetadata = () => {
          dispatch(setDuration(Math.ceil(audio.duration)));
        };
        audio.ontimeupdate = () => {
          dispatch(setCurrentTime(Math.ceil(audio.currentTime)));
        };
        audio.play();
        prevTrack = activeTrack;
      } else if (activeTrack?._id === prevTrack?._id && pause === false) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [activeTrack, pause]);

  useEffect(() => {}, [activeTrack]);

  const play = () => {
    if (pause) {
      dispatch(playTrack());
    } else {
      dispatch(pauseTrack());
    }
  };

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    dispatch(setVolume(Number(e.target.value)));
  };

  const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  return (
    <div className={styles.playerWrapp}>
      <div className={styles.playerTimer}>
        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      </div>
      <div className={styles.player}>
        <Grid container alignItems="center">
          <IconButton onClick={play}>{!pause ? <Pause /> : <PlayArrow />}</IconButton>
          <p>
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </p>
          <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
            <div>{track.name}</div>
            <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
          </Grid>
        </Grid>

        <div className={styles.playerVolume}>
          <VolumeUp />
          <div className={styles.playerVolumeBox}>
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
