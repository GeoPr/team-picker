import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { maxCountOfSelectedPlayers, useContextValue } from '../../../../context/context';
import { TApp } from '../../../../redux/store';
import './Teams.scss';

export const Teams = () => {
  const { leftTeam, rightTeam } = useSelector((s: TApp) => s.teams);
  const { countOfSelectedPlayers } = useContextValue();
  const shouldShowTotalPower = countOfSelectedPlayers >= maxCountOfSelectedPlayers;

  return (
    <div className="teams">
      <Typography variant="h5" component="h3" className="teams__title">
        Teams
      </Typography>
      {shouldShowTotalPower && (
        <div className="teams__totals">
          <Typography variant="h4" className="teams__total teams__total_left">
            Total power: {leftTeam.totalPower}
          </Typography>
          {leftTeam.isWin && rightTeam.isWin ? (
            <Typography variant="h4">Draw !</Typography>
          ) : null}
          <Typography variant="h4" className="teams__total teams__total_right">
            Total power: {rightTeam.totalPower}
          </Typography>
        </div>
      )}
      <div className="teams__body">
        <div
          className={`teams__team teams__team_left ${
            leftTeam.isWin && '_win'
          }`}>
          {leftTeam.players.map(player => (
            <div className="teams__item teams__item_left" key={player.id}>
              {player.name.trim()[0].toUpperCase()}
            </div>
          ))}
        </div>
        <div className="teams__middle-line">
          <span>VS</span>
        </div>
        <div
          className={`teams__team teams__team_right ${
            rightTeam.isWin && '_win'
          }`}>
          {rightTeam.players.map(player => (
            <div className="teams__item teams__item_right" key={player.id}>
              {player.name.trim()[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
