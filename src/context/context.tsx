import React, { createContext, useContext, useState } from 'react';
import { IPlayer } from '../redux/reducers/playersReducer/helperTypes';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;
type Modal = 'EDIT_PLAYER' | 'CREATE_PLAYER';

export const maxCountOfSelectedPlayers = 6;

interface IContextProps {
  whatModalOpen: Modal | null;
  setWhatModalOpen: SetStateFunction<Modal | null>;
  currentEditablePlayer: IPlayer | null;
  setCurrentEditablePlayer: SetStateFunction<IPlayer | null>;
  countOfSelectedPlayers: number;
  setCountOfSelectedPlayers: SetStateFunction<number>;
}

const Context = createContext({} as IContextProps);

export const ContextProvider: React.FC = ({ children }) => {
  const [whatModalOpen, setWhatModalOpen] = useState<Modal | null>(null);
  const [
    currentEditablePlayer,
    setCurrentEditablePlayer,
  ] = useState<IPlayer | null>(null);
  const [countOfSelectedPlayers, setCountOfSelectedPlayers] = useState(0);

  const value: IContextProps = {
    whatModalOpen,
    setWhatModalOpen,
    currentEditablePlayer,
    setCurrentEditablePlayer,
    countOfSelectedPlayers,
    setCountOfSelectedPlayers,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContextValue = () => useContext(Context);
