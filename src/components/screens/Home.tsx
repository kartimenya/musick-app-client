import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../Layout';

const Home = () => {
  const router = useRouter();

  return (
    <Layout>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <h1>Добро пожаловать на музыкальную платформу</h1>
        <Button onClick={() => router.push('/tracks')}>Перейти к трекам</Button>
      </Grid>
    </Layout>
  );
};

export default Home;
