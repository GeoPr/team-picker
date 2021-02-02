import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { TApp } from '../../redux/store';
import { Typography } from '@material-ui/core';
import { Players } from './components/Players/Players';
import './PlayersPage.scss';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

export const PlayersPage = () => {
  const players = useSelector((s: TApp) => s.players);
  const styles = useStyles();

  return (
    <section className="players-page">
      <div className="players-page__container _container">
        <div className="players-page__body">
          {players.length ? (
            <Players />
          ) : (
            <Typography variant="h3" className={styles.root}>
              There is nothing yet
            </Typography>
          )}
        </div>
      </div>
    </section>
  );
};
