type ContextProps = {
	modalVisible: boolean;
	addTaskListModal: boolean;
	userDetails: any;
	setModalVisible: (modal: boolean) => void;
	isUpgradeModalOpen: boolean;
	setIsUpgradeModalOpen: (modal: boolean) => void;
	openModal: () => void;
	closeModal: () => void;
	openTaskListModal: () => void;
	closeTaskListModal: () => void;
	setUserInfo: () => void;
	openUpgradeModal: () => void;
};
