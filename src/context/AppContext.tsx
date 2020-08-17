import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { getUserInfo } from './queries';
import { ContextProps } from 'types';

type Props = {
	children: React.ReactNode;
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
	const [openModal, setOpenModal] = useState<string>('');

	let location = useLocation();
	const [userDetails, setUserDetails] = useState();
	const [activeLink, setActive] = useState<string>('Overview');
	const [isLayoutActive, setIsLayoutActive] = useState(false);
	const [projectId, setProjectId] = useState<string>('');

	const closeModal = () => {
		setOpenModal('');
	};

	useEffect(() => {
		let link = location.pathname.split('/').pop();
		if (link) {
			link.charAt(0).toUpperCase();
			setActive(link);
		}
	}, []);

	const setUserInfo = async () => {
		setUserDetails(await getUserInfo());
	};

	// const setProjectIdInContext = (projectId: string) => {
	// 	setProjectId(projectId);
	// };

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
