import { Team } from './../teamsReducer/helperTypes';

export interface IPlayer {
  isSkillsOpen: boolean;
  isSelected: boolean;
  name: string;
  power: number;
  skills: string[];
  id: number;
  team: Team | null;
}

export interface IPassedPlayer {
  name: string;
  power: number;
  skills: string;
}

// export type PassedPlayer = Omit<IPlayer, 'id' | 'isSelected' | 'isOpen'>;
