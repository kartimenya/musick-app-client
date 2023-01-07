import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ITrack } from '../models/track';
import { pauseTrack, playTrack, setActiveTrack } from '../store/slices/player';
import { deleteTracks } from '../store/slices/track';
import styles from '../styles/TrackItem.module.css';

interface ITrackItem {
  track: ITrack;
  active?: boolean;
}

const TrackItem: FC<ITrackItem> = ({ track, active = false }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pause, activeTrack, currentTime, duration } = useAppSelector((state) => state.player);

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const play = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (pause && activeTrack?._id !== track._id) {
      dispatch(setActiveTrack(track));
      dispatch(playTrack());
    } else if (!pause && activeTrack?._id !== track._id) {
      dispatch(setActiveTrack(track));
      dispatch(playTrack());
    } else if (pause && activeTrack?._id === track._id) {
      dispatch(playTrack());
    } else {
      dispatch(pauseTrack());
    }
  };

  const deleteClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(deleteTracks(track._id));
  };

  return (
    <Card className={styles.track} onClick={() => router.push(`/tracks/${track._id}`)}>
      <Grid container alignItems="center">
        <IconButton onClick={play}>{active ? <Pause /> : <PlayArrow />}</IconButton>
        <img width={30} height={30} src={`http://localhost:5000/${track.picture}`} />
        <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
          <div>{track.name}</div>
          <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" justifyContent="flex-end">
        {active && (
          <div style={{}}>
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </div>
        )}
        <IconButton onClick={deleteClick}>
          <Delete />
        </IconButton>
      </Grid>
    </Card>
  );
};

export default TrackItem;
