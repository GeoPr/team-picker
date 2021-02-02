import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useContextValue } from '../../context/context';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { playerFormSchema } from '../CreatePlayer/CreatePlayer';
import { useDispatch } from 'react-redux';
import {
  editPlayer,
  removePlayer,
} from '../../redux/reducers/playersReducer/actions';
import { IPassedPlayer } from '../../redux/reducers/playersReducer/helperTypes';
import './EditPlayer.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    icon: {
      fontSize: 25,
    },
    removeButton: {
      margin: '0px 20px 0px 0px',
    },
    saveButton: {
      background: 'green',
      '&:hover': {
        background: 'rgb(0, 100, 0)',
      },
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditPlayer = () => {
  const styles = useStyles();
  const {
    currentEditablePlayer,
    setCurrentEditablePlayer,
    whatModalOpen,
    setWhatModalOpen,
  } = useContextValue();
  const { errors, handleSubmit, register, reset } = useForm<IPassedPlayer>({
    resolver: yupResolver(playerFormSchema),
  });
  const dispatch = useDispatch();

  const closeDialog = () => {
    setWhatModalOpen(null);
  };

  const onSubmit = handleSubmit(data => {
    dispatch(editPlayer(currentEditablePlayer!.id, data));
    reset();
    closeDialog();
    setCurrentEditablePlayer(null);
  });

  const deletePlayer = () => {
    dispatch(removePlayer(currentEditablePlayer!.id));
    closeDialog();
  };

  return (
    <Dialog
      fullScreen
      open={whatModalOpen === 'EDIT_PLAYER'}
      onClose={closeDialog}
      TransitionComponent={Transition}>
      <AppBar className={styles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="secondary"
            onClick={closeDialog}
            aria-label="close">
            <CancelIcon className={styles.icon} />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            Edit the player
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={deletePlayer}
            className={styles.removeButton}>
            Remove this player
          </Button>
          <Button
            color="inherit"
            variant="contained"
            onClick={onSubmit}
            className={styles.saveButton}>
            Save changes
          </Button>
        </Toolbar>
      </AppBar>
      <form className="edit-player-form" onSubmit={onSubmit}>
        <TextField
          autoFocus
          color="primary"
          variant="outlined"
          label="Name"
          autoComplete="off"
          error={!!errors.name}
          helperText={errors.name?.message}
          name="name"
          inputRef={register({ required: true })}
          defaultValue={currentEditablePlayer?.name}
        />
        <TextField
          color="primary"
          variant="outlined"
          label="Power (number)"
          autoComplete="off"
          name="power"
          inputRef={register}
          defaultValue={currentEditablePlayer?.power || ''}
        />
        <TextField
          color="primary"
          variant="outlined"
          label="Skills (via comma)"
          autoComplete="off"
          name="skills"
          inputRef={register}
          defaultValue={currentEditablePlayer?.skills.join(', ') || ''}
        />
      </form>
    </Dialog>
  );
};
