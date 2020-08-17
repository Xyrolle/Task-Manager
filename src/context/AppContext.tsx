import React, { useState, createContext } from 'react';
import { getUserInfo } from './queries';
import { ContextProps } from 'types';

type Props = {
	children: React.ReactNode;
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
	const [openModal, setOpenModal] = useState<string>('');

	const [userDetails, setUserDetails] = useState();
	const [activeLink, setActive] = useState('Overview');
	const [isLayoutActive, setIsLayoutActive] = useState(false);
	const [projectId, setProjectId] = useState<string>('');

	const closeModal = (): void => {
		setOpenModal('');
	};

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
