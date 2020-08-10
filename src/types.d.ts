type ContextProps = {
  openModal: string,
  setOpenModal: (modalName: string) => void,
  userDetails: any,
  closeModal: () => void,
  setUserInfo: () => void,
  activeLink: string,
  setActive: (link: string) => void,
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
