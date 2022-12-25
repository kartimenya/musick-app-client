import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';

const trackPage = () => {
  const track = {
    _id: '1',
    artist: 'Artist-1',
    audio: 'sd',
    name: 'name-1',
    listens: 1,
    text: 'text-1',
    picture: 'ds',
    coments: [],
  };

  const router = useRouter();
  return (
    <Layout>
      <Button variant="outlined" style={{ fontSize: 32 }} onClick={() => router.push('/tracks')}>
        К списку
      </Button>
      <Grid container>
        <img src={track.picture} width={200} height={200} />
        <div style={{ marginLeft: 30 }}>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Текст трека</h1>
      <p>{track.text}</p>
      <h1>Коментарии</h1>
      <Grid container>
        <TextField label="Ваше имя" fullWidth />
        <TextField label="Коментарий" fullWidth multiline rows={3} />
        <Button>Отправить</Button>
      </Grid>
    </Layout>
  );
};

export default trackPage;
