import { Team } from './../teamsReducer/helperTypes';
import { CREATE_PLAYER, REMOVE_PLAYER, EDIT_PLAYER, SHOW_HIDE_PLAYER_SKILLS, REMOVE_SKILL, SELECT_PLAYER, RESET_SELECTED_PLAYERS } from './actionsTypes';
import { IPassedPlayer } from './helperTypes'

export const createPlayer = (newPlayer: IPassedPlayer) => ({
  type: CREATE_PLAYER,
  payload: { newPlayer },
} as const);

export const removePlayer = (id: number) => ({
  type: REMOVE_PLAYER,
  payload: { id },
} as const);

export const editPlayer = (id: number, editablePlayer: IPassedPlayer) => ({
  type: EDIT_PLAYER,
  payload: { id, editablePlayer },
} as const);

export const showHidePlayerSkills = (id: number) => ({
  type: SHOW_HIDE_PLAYER_SKILLS,
  payload: { id },
} as const);

export const removeSkill = (playerId: number, skillIdx: number) => ({
  type: REMOVE_SKILL,
  payload: { playerId, skillIdx },
} as const);

export const selectPlayer = (id: number, team: Team) => ({
  type: SELECT_PLAYER,
  payload: { id, team },
} as const);

export const resetSelectedPlayers = () => ({
  type: RESET_SELECTED_PLAYERS,
} as const)