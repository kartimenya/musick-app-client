import React, { FC } from 'react';

interface ITrackProgress {
  left: number;
  right: number;
  onChange: (e: any) => void;
}

const TrackProgress: FC<ITrackProgress> = ({ left, right, onChange }) => {
  return (
    <div>
      <input type="range" min={0} max={right} value={left} onChange={onChange} />
      <div>
        {left} / {right}
      </div>
    </div>
  );
};

export default TrackProgress;
