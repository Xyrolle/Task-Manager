import React, { useState, createContext } from 'react';
import { getUserInfo } from './queries';

type Props = {
  children: React.ReactNode,
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
  const [openModal, setOpenModal] = useState<string>('');

  const [userDetails, setUserDetails] = useState();
  const [activeLink, setActive] = useState('Overview');

  const closeModal = (): void => {
    setOpenModal('');
  };

  const setUserInfo = async () => {
    await setUserDetails(await getUserInfo());
  };

  return (
    <AppContext.Provider
      value={{
        openModal,
        setOpenModal,
        closeModal,
        setUserInfo,
        userDetails,
        activeLink,
        setActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
