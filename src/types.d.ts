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

interface ITask {
  title: string;
  description: string;
  creationDate: string;
  id: string;
  list_id?: string;
  tags: ITag[];
}
