import React from 'react';
import { CreatePlayer } from './CreatePlayer/CreatePlayer';
import { EditPlayer } from './EditPlayer/EditPlayer';
import { Header } from './Header/Header';
import { HomePage } from '../pages/HomePage/HomePage';
import { PlayersPage } from '../pages/PlayersPage/PlayersPage';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />

      <main className="page">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/players" component={PlayersPage} />
        </Switch>
      </main>

      {/* Modals */}
      <CreatePlayer />
      <EditPlayer />
    </div>
  );
};

export default App;
