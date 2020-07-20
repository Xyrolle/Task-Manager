import React, { useState, createContext } from 'react';

type Props = {
  children: React.ReactNode;
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = (): void => {
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  return (
    <AppContext.Provider
      value={{ modalVisible, setModalVisible, openModal, closeModal }}
    >
      {children}
    </AppContext.Provider>
  );
};
