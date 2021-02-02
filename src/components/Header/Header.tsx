import React from 'react';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useContextValue } from '../../context/context';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: '2rem',
  },
}));

export const Header = () => {
  const { setWhatModalOpen } = useContextValue();
  const styles = useStyles();

  const openCreatePlayerModal = () => {
    setWhatModalOpen('CREATE_PLAYER');
  };

  return (
    <header className="header">
      <div className="header__container _container">
        <div className="header__body">
          <nav className="header__nav">
            <ul className="header__menu menu">
              <li className="menu__item">
                <NavLink
                  to="/"
                  className="menu__link"
                  activeClassName="menu__link_active" exact>
                  <Typography variant="h5">Home</Typography>
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/players"
                  className="menu__link"
                  activeClassName="menu__link_active">
                  <Typography variant="h5">All players</Typography>
                </NavLink>
              </li>
            </ul>
          </nav>
          <IconButton onClick={openCreatePlayerModal}>
            <AddBoxIcon color="secondary" className={styles.root} />
          </IconButton>
        </div>
      </div>
    </header>
  );
};
