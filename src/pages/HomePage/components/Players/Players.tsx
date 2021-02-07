import React, { useState } from 'react';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { TApp } from '../../../../redux/store';
import { selectPlayer } from '../../../../redux/reducers/playersReducer/actions';
import {
  addToTeam,
  selectWinner,
} from '../../../../redux/reducers/teamsReducer/actions';
import { IPlayer } from '../../../../redux/reducers/playersReducer/helperTypes';
import { Team } from '../../../../redux/reducers/teamsReducer/helperTypes';
import {
  maxCountOfSelectedPlayers,
  useContextValue,
} from '../../../../context/context';
import SwipeableViews from 'react-swipeable-views';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import './Players.scss';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: -5,
    top: 0,
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0%, -50%)',
    zIndex: 10,
    width: 30,
    height: 30,
  },
  buttonPrev: {
    left: -15,
    background: 'green',
    '&:hover': {
      background: 'green',
    },
  },
  buttonNext: {
    right: -15,
    background: 'red',
    '&:hover': {
      background: 'red',
    },
  },
}));

export const Players = () => {
  const players = useSelector((s: TApp) => s.players);
  const dispatch = useDispatch();
  const {
    setCountOfSelectedPlayers,
    countOfSelectedPlayers,
  } = useContextValue();
  const styles = useStyles();
  const [whatTeam, setWhatTeam] = useState<Team>(
    countOfSelectedPlayers % 2 === 0 ? 'leftTeam' : 'rightTeam',
  );
  const [index, setIndex] = useState(0);

  const choosePlayer = (player: IPlayer) => {
    if (!player.isSelected) {
      setCountOfSelectedPlayers(prev => prev + 1);

      if (whatTeam === 'leftTeam') {
        setWhatTeam('rightTeam');
      } else {
        setWhatTeam('leftTeam');
      }

      if (countOfSelectedPlayers < maxCountOfSelectedPlayers) {
        dispatch(selectPlayer(player.id, whatTeam));
        dispatch(addToTeam(player, whatTeam));
      }

      if (countOfSelectedPlayers === maxCountOfSelectedPlayers - 1) {
        // -1 because our state updated async
        dispatch(selectWinner());
      }
    }
  };

  const incerementIndex = () => {
    if (index <= players.length - 10) {
      setIndex(prev => prev + 1);
    }
  };

  const decerementIndex = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }
  };

  return (
    <div className="players">
      <div className="players__body">
        <Typography variant="h5" component="h3" className="players__title">
          Players
        </Typography>
        {players.length ? (
          <div className="players__slider">
            <IconButton
              className={`${styles.button} ${styles.buttonPrev}`}
              onClick={decerementIndex}>
              <NavigateBeforeIcon color="secondary" />
            </IconButton>
            <IconButton
              className={`${styles.button} ${styles.buttonNext}`}
              onClick={incerementIndex}>
              <NavigateNextIcon htmlColor="green" />
            </IconButton>
            <SwipeableViews
              enableMouseEvents
              resistance
              animateHeight
              index={index}
              slideClassName="players__slide"
              containerStyle={{
                width: 100,
                padding: '0 30px',
              }}>
              {players.map(player => (
                <div
                  key={player.id}
                  onClick={() => choosePlayer(player)}
                  className="players__player">
                  {player.name.trim()[0].toUpperCase()}
                  {player.isSelected && (
                    <CheckCircleIcon
                      htmlColor="orange"
                      className={styles.root}
                    />
                  )}
                </div>
              ))}
            </SwipeableViews>
          </div>
        ) : (
          <Typography variant="h6">There is nothing yet</Typography>
        )}
      </div>
    </div>
  );
};
