import { Dispatch } from 'redux';
import * as types from '../types';

// INITIALIZES CLOCK ON SERVER
interface ServerRenderClock {
  type: string;
  payload: { light: boolean; ts: number };
}
export const serverRenderClock = () => (dispatch: Dispatch): ServerRenderClock =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  });

// INITIALIZES CLOCK ON CLIENT
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const startClock = () => (dispatch: Dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } });
  }, 1000);

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT });

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT });

// RESET COUNTER
export const resetCount = () => ({ type: types.RESET });
