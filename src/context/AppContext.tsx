import React, { useState, createContext } from 'react';
import { getUserInfo } from './queries'

type Props = {
	children: React.ReactNode;
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider = ({ children }: Props) => {
	const [userDetails, setUserDetails] = useState()
	const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [addTaskListModal, setTaskListModal] = useState<boolean>(false);

	const openModal = (): void => {
		setModalVisible(true);
		setIsUpgradeModalOpen(false);
	};
	const openUpgradeModal = (): void => {
		setModalVisible(true);
		setIsUpgradeModalOpen(true);
	};

	const openTaskListModal = (): void => {
		setTaskListModal(true);
	};

	const closeModal = (): void => {
		setModalVisible(false);
	};

	const closeTaskListModal = (): void => {
		setTaskListModal(false);
	};
	const setUserInfo = async () => {
		await setUserDetails(await getUserInfo())
	}

	return (
		<AppContext.Provider
			value={{
				modalVisible,
				setModalVisible,
				openModal,
				closeModal,
				openTaskListModal,
				closeTaskListModal,
				addTaskListModal,
				setUserInfo,
				userDetails,
				isUpgradeModalOpen,
				setIsUpgradeModalOpen,
				openUpgradeModal
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

