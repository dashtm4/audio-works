import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AudioAPI from '@api/AudioAPI';
import { IAudio } from '@models/audio';
import { ALERT_TYPES } from '@constants/alert';

export interface IAudioState {
  audioList: IAudio[];
  selectedID: string | null;
  loading: boolean;
  status: {
    type: ALERT_TYPES;
    message: string;
  };
}

const initialState: IAudioState = {
  audioList: [],
  loading: false,
  selectedID: null,
  status: { type: ALERT_TYPES.success, message: '' },
};

export const fetchAudioList = createAsyncThunk('audio/fetchAudioList', async () => {
  const response = await AudioAPI.fetchAudioList();
  return response;
});

export const upstreamAudio = createAsyncThunk('audio/upstreamAudio', async (formData: any) => {
  const res = await AudioAPI.upstream(formData);
  return res.data;
});

export const audioSlice = createSlice({
  name: 'audio',
  initialState: initialState,
  reducers: {
    clearErrorMsg(state) {
      state.status = { type: ALERT_TYPES.success, message: '' };
    },
    selectID(state, action) {
      state.selectedID = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAudioList.pending, state => {
      state.loading = true;
      state.status = { type: ALERT_TYPES.success, message: '' };
    });
    builder.addCase(fetchAudioList.fulfilled, (state, action) => {
      state.audioList = action.payload;
      state.loading = false;
      state.status = { type: ALERT_TYPES.success, message: 'Fetched all the audio!' };
    });
    builder.addCase(fetchAudioList.rejected, state => {
      state.loading = false;
      state.status = { type: ALERT_TYPES.error, message: 'Failed to fetch.' };
    });
    builder.addCase(upstreamAudio.pending, state => {
      state.loading = true;
      state.status = { type: ALERT_TYPES.success, message: '' };
    });
    builder.addCase(upstreamAudio.fulfilled, (state, action) => {
      state.loading = false;
      state.audioList = [...state.audioList, action.payload.uploadedAudio];
      state.status = { type: ALERT_TYPES.success, message: 'Successfully uploaded!' };
    });
    builder.addCase(upstreamAudio.rejected, state => {
      state.loading = false;
      state.status = { type: ALERT_TYPES.error, message: 'Failed to upload.' };
    });
  },
});

export const { clearErrorMsg, selectID } = audioSlice.actions;

export default audioSlice.reducer;
