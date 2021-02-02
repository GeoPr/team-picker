import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useContextValue } from '../../../../context/context';
import { resetSelectedPlayers } from '../../../../redux/reducers/playersReducer/actions';
import { resetTeams } from '../../../../redux/reducers/teamsReducer/actions';
import './PickAgain.scss';

const useStyles = makeStyles(() => ({
  root: {
    height: 60,
  },
}));

export const PickAgain = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { setCountOfSelectedPlayers } = useContextValue();

  const onClick = () => {
    dispatch(resetSelectedPlayers());
    dispatch(resetTeams());
    setCountOfSelectedPlayers(0);
  };

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={onClick}
      className={styles.root}>
      Pick again
    </Button>
  );
};
