import { ITrack } from './../../models/track';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

export const fetchTracks = createAsyncThunk('track/fetch', async () => {
  const { data } = await axios.get<ITrack[]>('http://localhost:5000/tracks');

  return data;
});

export const deleteTracks = createAsyncThunk('track/delete', async (id: string) => {
  const { data } = await axios.delete<string>(`http://localhost:5000/tracks/${id}`);
  return data;
});

export interface TrackState {
  tracks: ITrack[];
  statuse: string;
}

const initialState: TrackState = {
  tracks: [],
  statuse: '',
};

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.statuse = 'pending';
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.statuse = 'failed';
    });
    builder.addCase(fetchTracks.fulfilled, (state, action: PayloadAction<ITrack[]>) => {
      state.statuse = 'fulfilled';
      state.tracks = action.payload;
    });

    builder.addCase(deleteTracks.fulfilled, (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter((track) => track._id !== action.payload);
    });

    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.track,
      };
    });
  },
});

export default trackSlice.reducer;
