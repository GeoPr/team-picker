import { ADD_TO_TEAM, RESET_TEAMS, SELECT_WINNER } from './actionsTypes';
import { IPlayer } from './../playersReducer/helperTypes';
import { Team } from './helperTypes';

export const addToTeam = (player: IPlayer, team: Team) => ({
	type: ADD_TO_TEAM,
	payload: { player, team },
} as const);

export const resetTeams = () => ({
	type: RESET_TEAMS
} as const);

export const selectWinner = () => ({
	type: SELECT_WINNER
} as const);