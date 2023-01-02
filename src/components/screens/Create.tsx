import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import FileUpload from '../FileUpload';
import StepWrapper from '../StepWrapper';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const [picture, setPicture] = useState<Blob | null>(null);
  const [audio, setAudio] = useState<Blob | null>(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else if (picture && audio) {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios
        .post('http://localhost:5000/tracks', formData)
        .then((resp) => router.push('/tracks'))
        .catch((e) => console.log(e));
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField {...name} label="Название трека" style={{ marginTop: 10 }} />
            <TextField {...artist} label="Автор" style={{ marginTop: 10 }} />
            <TextField {...text} label="Текст трека" multiline rows={3} style={{ marginTop: 10 }} />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить картинку</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button onClick={next}>Далее</Button>
      </Grid>
    </>
  );
};

export default Create;
