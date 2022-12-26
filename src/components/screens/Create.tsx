import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import StepWrapper from '../StepWrapper';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
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
            <TextField label="Название трека" style={{ marginTop: 10 }} />
            <TextField label="Автор" style={{ marginTop: 10 }} />
            <TextField label="Текст трека" multiline rows={3} style={{ marginTop: 10 }} />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={() => {}} accept="image/*">
            <Button>Загрузить картинку</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={() => {}} accept="audio/*">
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
