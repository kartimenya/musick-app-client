import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks/reduxHooks';
import TrackList from '../TrackList';

const Tracks = () => {
  const router = useRouter();
  const { tracks } = useAppSelector((state) => state.track);

  return (
    <Card style={{ width: '100%' }}>
      <Box p={3}>
        <Grid container justifyContent="space-between">
          <h1>Список треков</h1>
          <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
        </Grid>
        <TrackList tracks={tracks} />
      </Box>
    </Card>
  );
};

export default Tracks;
