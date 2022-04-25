import { configureStore } from '@reduxjs/toolkit';

import alert, { IAlertState } from './slices/alert';
import audio, { IAudioState } from './slices/audio';

const store = configureStore({
  reducer: {
    alert,
    audio,
  },
});

export interface IRootState {
  alert: IAlertState;
  audio: IAudioState;
}

export default store;
