import { Slider, useTheme } from '@mui/material';
import React, { FC } from 'react';

interface ITrackProgress {
  left: number;
  right: number;
  onChange: (e: any) => void;
}

const TrackProgress: FC<ITrackProgress> = ({ left, right, onChange }) => {
  const theme = useTheme();
  return (
    <div>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={left}
        min={0}
        step={1}
        max={right}
        onChange={onChange}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          '& .MuiSlider-thumb': {
            width: 10,
            height: 10,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px ${
                theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'
              }`,
            },
            '&.Mui-active': {
              width: 15,
              height: 15,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.4,
          },
        }}
      />
    </div>
  );
};

export default TrackProgress;
