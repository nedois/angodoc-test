import { combineReducers } from 'redux';
import * as types from '../types';

// COUNTER REDUCER
const counterReducer = (state = 0, { type }: { type: any }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return 0;
    default:
      return state;
  }
};

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
};

// COMBINED REDUCERS
const reducers = {};

export default combineReducers(reducers);
