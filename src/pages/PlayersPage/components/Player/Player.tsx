import React, { FC } from 'react';
import { IPlayer } from '../../../../redux/reducers/playersReducer/helperTypes';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import {
  removeSkill,
  showHidePlayerSkills,
} from '../../../../redux/reducers/playersReducer/actions';
import { IconButton, Typography } from '@material-ui/core';
import { useContextValue } from '../../../../context/context';
import './Player.scss';

interface IProps {
  player: IPlayer;
}

const useStyles = makeStyles(() => ({
  subList: {
    padding: '0px 80px 10px 80px',
    display: 'grid',
    rowGap: '10px',
  },
  subListItem: {
    background: '#727171',
    borderRadius: '5px',
  },
  editIcon: {
    transition: 'all 0.5s ease 0s',
    '&:hover': {
      background: 'rgba(94, 85, 85, 0.54)',
    },
  },
  selectedIcon: {
    transition: 'all 0.5s ease 0s',
    '&:hover': {
      background: 'rgba(0, 140, 0, 0.2)',
    },
  },
  blockIcon: {
    transition: 'all 0.5s ease 0s',
    '&:hover': {
      background: 'rgba(252, 142, 142, 0.1);',
    },
  },
}));

export const Player: FC<IProps> = ({ player }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const {
    setCurrentEditablePlayer,
    setWhatModalOpen,
    countOfSelectedPlayers,
  } = useContextValue();

  const onClick = () => {
    dispatch(showHidePlayerSkills(player.id));
  };

  const openEditPlayerModal = () => {
    setWhatModalOpen('EDIT_PLAYER');
    setCurrentEditablePlayer(player);
  };

  const deleteSkill = (idx: number) => {
    dispatch(removeSkill(player.id, idx));
  };

  return (
    <li className="players-page__item">
      <div className="players-page__item-body">
        {player.isSelected ? (
          <IconButton className={styles.selectedIcon}>
            <CheckCircleIcon htmlColor="green" />
          </IconButton>
        ) : !countOfSelectedPlayers ? (
          <IconButton className={styles.editIcon} onClick={openEditPlayerModal}>
            <EditIcon htmlColor="#fff" />
          </IconButton>
        ) : (
          <IconButton className={styles.blockIcon}>
            <NotInterestedIcon htmlColor="red" />
          </IconButton>
        )}
        <ListItem button onClick={onClick}>
          <ListItemText
            primary={<Typography variant="h6">{player.name}</Typography>}
          />
          {player.skills.length && player.isSkillsOpen ? (
            <ExpandLess htmlColor="#fff" />
          ) : (
            <ExpandMore htmlColor="#fff" />
          )}
        </ListItem>
      </div>
      {player.skills.length ? (
        <Collapse
          key={player.id + 1}
          in={player.isSkillsOpen}
          timeout="auto"
          unmountOnExit>
          <List className={styles.subList}>
            {player.skills.map((skill, idx) => (
              <ListItem key={idx} className={styles.subListItem}>
                <ListItemText primary={`${idx + 1}) ${skill}`} />
                {player.isSelected || countOfSelectedPlayers ? null : (
                  <IconButton onClick={() => deleteSkill(idx)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </Collapse>
      ) : null}
    </li>
  );
};
