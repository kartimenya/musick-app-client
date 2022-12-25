import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ITrack } from '../models/track';
import { pauseTrack, playTrack, setActiveTrack, setVolume } from '../store/slices/player';
import styles from '../styles/Player.module.css';
import TrackProgress from './TrackProgress';

let audio: HTMLAudioElement;
let prevTrack: ITrack | null;

const Player = () => {
  const { pause, activeTrack, volume } = useAppSelector((state) => state.player);
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

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
  }, []);

  useEffect(() => {
    if (activeTrack) {
      if (activeTrack?._id !== prevTrack?._id && pause === false) {
        audio.src = activeTrack?.audio;
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

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>{!pause ? <Pause /> : <PlayArrow />}</IconButton>
      <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={() => {}} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
