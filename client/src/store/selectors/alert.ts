import { IRootState } from '@store/store';

export const getAlertState = (rootState: IRootState) => rootState.alert;
