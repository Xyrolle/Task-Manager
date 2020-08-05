type ContextProps = {
	modalVisible: boolean;
	addTaskListModal: boolean;
	userDetails: userDetailsInterfaceuserDetailsInterface;
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
interface userDetailsInterface {
	date_joined: string;
	email: string;
	first_name: string;
	groups: Array<T>;
	id: number;
	is_active: boolean;
	is_staff: boolean;
	is_superuser: boolean;

}
