import React, { useState, createContext, useEffect } from 'react';

type Props = {
  children: React.ReactNode,
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
  const user = !localStorage.getItem('user')
    ? null
    : JSON.parse(localStorage.getItem('user') || '{}');

  const [openModal, setOpenModal] = useState<string>('');
  const [userDetails, setUserDetails] = useState(user);
  const sessionLink = sessionStorage.getItem('activeLink');
  const link = sessionLink ? sessionLink : 'Overview';
  const [activeLink, setActive] = useState(link);
  const [isLayoutActive, setIsLayoutActive] = useState(false);
  const [projectId, setProjectId] = useState<string>('');

  const closeModal = () => {
    setOpenModal('');
  };

  useEffect(() => {
    // put value in context
    sessionStorage.setItem('activeLink', activeLink);
    return () => {
      console.log('gfdgwf', activeLink);
    };
  }, []);

  const setProjectIdInContext = (projectId: string) => {
    setProjectId(projectId);
  };

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
