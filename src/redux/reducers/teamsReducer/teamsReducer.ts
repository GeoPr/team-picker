import { ADD_TO_TEAM, RESET_TEAMS, SELECT_WINNER } from './actionsTypes';
import { TActions } from './../../store';
import { IPlayer } from './../playersReducer/helperTypes';
import * as actions from './actions';

interface ITeam {
  players: IPlayer[];
  totalPower: number;
  isWin: boolean;
}

interface InitalState {
  [key: string]: ITeam;
}

const initalTeam: ITeam = {
  players: [],
  totalPower: 0,
  isWin: false,
};

const initalState: InitalState = {
  leftTeam: initalTeam,
  rightTeam: initalTeam,
};

type Action = TActions<typeof actions>;

export const teamReducer = (
  state: typeof initalState = initalState,
  action: Action,
): InitalState => {
  switch (action.type) {
    case ADD_TO_TEAM: {
      const { player, team } = action.payload;

      state[team] = {
        ...state[team],
        players: [...state[team].players, player],
      };

      return { ...state };
    }

    case RESET_TEAMS: {
      return {
        ...state,
        leftTeam: initalTeam,
        rightTeam: initalTeam,
      };
    }

    case SELECT_WINNER: {
      const totals: number[] = [];
      const entries = Object.entries(state);

      entries.forEach(([team, { players }]) => {
        state[team].totalPower = getTotalPower(players);
        totals.push(getTotalPower(players));
      });

      const maxTotalPower = Math.max(...totals);

      entries.forEach(([team, { totalPower }]) => {
        if (totalPower === maxTotalPower) {
          state[team].isWin = true;
        }
      });

      return { ...state };
    }

    default: {
      return state;
    }
  }
};

function getTotalPower(players: IPlayer[]) {
  return players.reduce((acc, { power }) => {
    acc += +power;
    return acc;
  }, 0);
}
