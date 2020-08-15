import React, { useState, createContext, useEffect } from 'react';
import { getUserInfo } from './queries';

type Props = {
	children: React.ReactNode;
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
	const [ openModal, setOpenModal ] = useState<string>('');

	const [ userDetails, setUserDetails ] = useState();
	const sessionLink = sessionStorage.getItem('activeLink');
	const link =
		sessionLink ? sessionLink :
		'Overview';
	const [ activeLink, setActive ] = useState(link);
	const [ isLayoutActive, setIsLayoutActive ] = useState(false);
	const [ projectId, setProjectId ] = useState<string>('');

	const closeModal = () => {
		setOpenModal('');
	};

	console.log(activeLink, sessionLink);

	useEffect(() => {
		// put value in context
		sessionStorage.setItem('activeLink', activeLink);
		return () => {
			console.log('gfdgwf', activeLink);
		};
	}, []);

	const setUserInfo = async () => {
		setUserDetails(await getUserInfo());
	};

	const setProjectIdInContext = (projectId: string) => {
		setProjectId(projectId);
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
				isLayoutActive,
				setIsLayoutActive,
				setProjectId,
				projectId
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
