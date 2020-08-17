import { ReactText } from "react";

type ContextProps = {
  openModal: string,
  setOpenModal: (modalName: string) => void,
  userDetails: any,
  closeModal: () => void,
  setUserInfo: () => void,
  activeLink: string,
  setActive: (link: string) => void,
  isLayoutActive: boolean,
  setIsLayoutActive: (layout: boolean) => void,
  setProjectId: (projectId: string) => any,
  projectId: any,
};

interface userDetailsInterface {
  date_joined: string;
  email: string;
  first_name: string;
  groups: number[];
  id: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  last_name: string;
  user_permissions: number[];
  username: string;
}
