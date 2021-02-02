import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useSelector } from 'react-redux';
import { TApp } from '../../../../redux/store';
import { Player } from '../Player/Player';
import './Players.scss';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 80px',
    display: 'grid',
    rowGap: '10px',
  },
}));

export const Players = () => {
  const players = useSelector((s: TApp) => s.players);
  const styles = useStyles();

  return (
    <List className={styles.root}>
      {players.map(player => (
        <Player player={player} key={player.id} />
      ))}
    </List>
  );
};
