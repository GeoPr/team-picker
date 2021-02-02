import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { useContextValue } from '../../context/context';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createPlayer } from '../../redux/reducers/playersReducer/actions';
import { IPassedPlayer } from '../../redux/reducers/playersReducer/helperTypes';
import './CreatePlayer.scss';

export const playerFormSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[^0-9]*$/, 'This field must not contain numbers')
    .required('This is a required field'),
  power: yup
    .number()
    .positive('It can be only positive number')
    .typeError('This field must be a number'),
  skills: yup.string(),
});

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 500,
  },
  button: {
    justifySelf: 'start',
  },
}));

export const CreatePlayer = () => {
  const { setWhatModalOpen, whatModalOpen } = useContextValue();
  const { register, handleSubmit, errors, reset } = useForm<IPassedPlayer>({
    resolver: yupResolver(playerFormSchema),
  });
  const styles = useStyles();
  const dispatch = useDispatch();

  const closeDialog = () => {
    setWhatModalOpen(null);
  };

  const onSubmit = handleSubmit(data => {
    data.power = +data.power;

    dispatch(createPlayer(data));
    reset();
    closeDialog();
  });

  return (
    <Dialog open={whatModalOpen === 'CREATE_PLAYER'} onClose={closeDialog}>
      <DialogTitle>Create new player</DialogTitle>
      <DialogContent dividers className={styles.root}>
        <form className="create-player-form" onSubmit={onSubmit}>
          <TextField
            autoFocus
            color="primary"
            variant="filled"
            label="Name"
            autoComplete="off"
            error={!!errors.name}
            helperText={errors.name?.message}
            name="name"
            inputRef={register({ required: true })}
          />
          <TextField
            color="primary"
            variant="filled"
            label="Power (number)"
            autoComplete="off"
            name="power"
            inputRef={register}
            error={!!errors.power}
            helperText={errors.power?.message}
          />
          <TextField
            color="primary"
            variant="filled"
            label="Skills (via comma)"
            autoComplete="off"
            name="skills"
            inputRef={register}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={styles.button}>
            Create
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
