import {
  CREATE_PLAYER,
  REMOVE_PLAYER,
  EDIT_PLAYER,
  SHOW_HIDE_PLAYER_SKILLS,
  REMOVE_SKILL,
  SELECT_PLAYER,
  RESET_SELECTED_PLAYERS,
} from './actionsTypes';
import { TActions } from './../../store';
import { IPlayer } from './helperTypes';
import * as actions from './actions';

type InitalState = Array<IPlayer>;
const initalState: InitalState = [];
type Action = TActions<typeof actions>;

export const playersReducer = (
  state: InitalState = initalState,
  action: Action,
): InitalState => {
  switch (action.type) {
    case CREATE_PLAYER: {
      const { newPlayer } = action.payload;
      const id = Date.now();
      const skills = newPlayer.skills.split(',').filter(s => s.trim());

      return [
        ...state,
        {
          ...newPlayer,
          id,
          isSelected: false,
          isSkillsOpen: false,
          skills,
          team: null,
        },
      ];
    }

    case REMOVE_PLAYER: {
      const { id } = action.payload;

      return state.filter(player => player.id !== id);
    }

    case EDIT_PLAYER: {
      const { id, editablePlayer } = action.payload;
      const skills = editablePlayer.skills.split(',').filter(s => s.trim());

      return state.map(player => {
        if (player.id === id) {
          return { ...player, ...editablePlayer, skills };
        }

        return player;
      });
    }

    case SHOW_HIDE_PLAYER_SKILLS: {
      const { id } = action.payload;

      return state.map(player => {
        if (player.id === id) {
          return { ...player, isSkillsOpen: !player.isSkillsOpen };
        }

        return player;
      });
    }

    case REMOVE_SKILL: {
      const { playerId, skillIdx } = action.payload;

      return state.map(player => {
        if (player.id === playerId) {
          player.skills = player.skills.filter((_, idx) => idx !== skillIdx);
        }

        return player;
      });
    }

    case SELECT_PLAYER: {
      const { id, team } = action.payload;

      return state.map(player => {
        if (player.id === id) {
          return {
            ...player,
            isSelected: true,
            team: !player.team ? team : null,
          };
        }

        return player;
      });
    }

    case RESET_SELECTED_PLAYERS: {
      return state.map(player => ({ ...player, isSelected: false }));
    }

    default: {
      return state;
    }
  }
};
