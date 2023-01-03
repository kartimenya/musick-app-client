import { Box, Button, Card, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { IComent, ITrack } from '../../models/track';
import CommentItem from '../CommentItem';

interface ITrackScreen {
  serverTrack: ITrack;
}

const TrackScreen: FC<ITrackScreen> = ({ serverTrack }) => {
  const [track, seTtrack] = useState(serverTrack);
  const router = useRouter();
  const username = useInput();
  const text = useInput();

  const addComment = async () => {
    try {
      const comment = await axios.post<IComent>('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id,
      });
      seTtrack({ ...track, comments: [...track.comments, comment.data] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="outlined" style={{ fontSize: 32 }} onClick={() => router.push('/tracks')}>
        К списку
      </Button>
      <Grid container>
        <img src={`http://localhost:5000/${track.picture}`} width={200} height={200} />
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
        <TextField {...username} label="Ваше имя" fullWidth />
        <TextField {...text} label="Коментарий" fullWidth multiline rows={3} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <Box pt={2}>
        {track.comments.map((comment) => (
          <CommentItem key={comment._id} text={comment.text} username={comment.username} />
        ))}
      </Box>
    </div>
  );
};

export default TrackScreen;
