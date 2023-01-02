import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ITrack } from '../models/track';
import { pauseTrack, playTrack, setActiveTrack } from '../store/slices/player';
import styles from '../styles/TrackItem.module.css';

interface ITrackItem {
  track: ITrack;
  active?: boolean;
}

const TrackItem: FC<ITrackItem> = ({ track, active = false }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pause, activeTrack } = useAppSelector((state) => state.player);

  const play = (e: any) => {
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

  return (
    <Card className={styles.track} onClick={() => router.push(`/tracks/${track._id}`)}>
      <IconButton onClick={play}>{active ? <Pause /> : <PlayArrow />}</IconButton>
      <img width={30} height={30} src={`http://localhost:5000/${track.picture}`} />
      <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:15</div>}
      <IconButton onClick={(e) => e.stopPropagation()} style={{ marginLeft: 'auto' }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
