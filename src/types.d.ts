type ContextProps = {
  modalVisible: boolean;
  addTaskListModal: boolean;
  setModalVisible: (modal: boolean) => void;
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (modal: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  openTaskListModal: () => void;
  closeTaskListModal: () => void;
  openUpgradeModal: () => void;
};
