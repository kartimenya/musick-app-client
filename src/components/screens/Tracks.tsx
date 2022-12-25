import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import { ITrack } from '../../models/track';
import TrackList from '../TrackList';

const Tracks = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {
      _id: '1',
      artist: 'Artist-1',
      audio: 'http://localhost:5000/audio/0bb070b6-9113-44bd-b4f2-c362b9e88a13.mp3',
      name: 'name-1',
      listens: 1,
      text: 'text-1',
      picture: 'http://localhost:5000/audio/0bb070b6-9113-44bd-b4f2-c362b9e88a13.mp3',
      coments: [],
    },
    {
      _id: '2',
      artist: 'Artist-2',
      audio: 'http://localhost:5000/audio/disturbed-down-with-the-sickness.mp3',
      name: 'name-2',
      listens: 2,
      text: 'text-2',
      picture: 'disturbed-down-with-the-sickness.mp3',
      coments: [],
    },
  ];
  return (
    <Grid container justifyContent="center">
      <Card style={{ width: '100%' }}>
        <Box p={3}>
          <Grid container justifyContent="space-between">
            <h1>Список треков</h1>
            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
          </Grid>
        </Box>
        <TrackList tracks={tracks} />
      </Card>
    </Grid>
  );
};

export default Tracks;
