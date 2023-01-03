import { Box, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { ITrack } from '../models/track';
import TrackItem from './TrackItem';

interface ITrackList {
  tracks: ITrack[];
}

const TrackList: FC<ITrackList> = ({ tracks }) => {
  const { activeTrack, pause } = useAppSelector((state) => state.player);

  return (
    <Grid container direction="column">
      {tracks.map((track) => {
        if (activeTrack?._id === track._id) {
          return <TrackItem key={track._id} track={track} active={!pause} />;
        }
        return <TrackItem key={track._id} track={track} />;
      })}
    </Grid>
  );
};

export default TrackList;
