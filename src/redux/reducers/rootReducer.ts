import { teamReducer } from './teamsReducer/teamsReducer';
import { playersReducer } from './playersReducer/playersReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  players: playersReducer,
  teams: teamReducer,
});
