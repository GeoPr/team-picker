import React from 'react';
import {
  maxCountOfSelectedPlayers,
  useContextValue,
} from '../../context/context';
import { PickAgain } from './components/PickAgain/PickAgain';
import { Players } from './components/Players/Players';
import { Teams } from './components/Teams/Teams';
import './HomePage.scss';

export const HomePage = () => {
  const { countOfSelectedPlayers } = useContextValue();

  return (
    <section className="home-page">
      <div className="home-page__container _container">
        <div className="home-page__body">
          <Players />
          <Teams />
          {countOfSelectedPlayers >= maxCountOfSelectedPlayers && <PickAgain />}
        </div>
      </div>
    </section>
  );
};
