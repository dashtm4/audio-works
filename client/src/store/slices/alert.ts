import { createSlice } from '@reduxjs/toolkit';

import { ALERT_TYPES } from '@constants/alert';

export interface IAlertState {
  isVisible: boolean;
  alertType: ALERT_TYPES;
  message: string;
  closeTimestamp: number;
}

const initialState: IAlertState = {
  isVisible: false,
  alertType: ALERT_TYPES.success,
  message: '',
  closeTimestamp: Infinity,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState: initialState,
  reducers: {
    addAlert(state, action) {
      const { type, message } = action.payload;
      state.isVisible = true;
      state.alertType = type;
      state.closeTimestamp = new Date().getTime() + 2000;
      state.message = message;
    },
    removeAlert(state) {
      state.isVisible = false;
      state.closeTimestamp = Infinity;
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
