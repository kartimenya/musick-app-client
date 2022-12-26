import { ITrack } from './../../models/track';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface PlayerState {
  currentTime: number;
  duration: number;
  activeTrack: ITrack | null;
  volume: number;
  pause: boolean;
}

const initialState: PlayerState = {
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
  activeTrack: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack(state) {
      state.pause = false;
    },
    pauseTrack(state) {
      state.pause = true;
    },
    setActiveTrack(state, action: PayloadAction<ITrack | null>) {
      state.activeTrack = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const { pauseTrack, playTrack, setCurrentTime, setDuration, setActiveTrack, setVolume } =
  playerSlice.actions;

export default playerSlice.reducer;
