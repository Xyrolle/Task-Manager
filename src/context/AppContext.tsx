import React, { useState, createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from 'types';

type Props = {
  children: React.ReactNode,
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
  const user = !localStorage.getItem('user')
    ? null
    : JSON.parse(localStorage.getItem('user') || '{}');

  const [openModal, setOpenModal] = useState<string>('');

  const location = useLocation();
  const [userDetails, setUserDetails] = useState(user);
  const [activeLink, setActive] = useState<string>('Overview');
  const [isLayoutActive, setIsLayoutActive] = useState(false);
  const [projectId, setProjectId] = useState<string>('');

  const closeModal = () => {
    setOpenModal('');
  };

  useEffect(() => {
    const link = location.pathname.split('/').pop();
    if (link) {
      link.charAt(0).toUpperCase();
      setActive(link);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        openModal,
        setOpenModal,
        closeModal,
        setUserDetails,
        userDetails,
        activeLink,
        setActive,
        isLayoutActive,
        setIsLayoutActive,
        setProjectId,
        projectId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
