import { userDetailsInterface } from 'types';

export interface Link {
  comments: number[]
  content: string;
  date: string;
  id: number;
  project: number;
  tags: TagInterface[];
  title: string;
  user: number;
}
export interface LinksInterface {
  data: LinkInterface[];
  objects_per_page: number;
  objects_total: number;
  page_current: number;
  page_total: number;
}
export interface LinkInterface {
  comments: number[];
  content: string;
  date: string;
  id: number;
  project: number;
  tags: TagInterface[];
  title: string;
  user: number;
}
export interface EditLinkInterface {
  content: string;
  linkId: number;
  projectId: string;
  tags: TagInterface[];
  title: string;
  userId: number;
  id?: number;
}
export interface TagInterface {
  title: string;
  id: number;
}
export interface AddCommentInterface {
  comment: string;
  linkId: string;
  projectId: string;
  userId: number;
}
export interface LinkCommentInterface {
  author: number;
  date: string;
  id: number;
  text: string;
}
export interface CreateTagInterface {
  title: string;
  linkId: number;
  projectId: string;
}
export interface AddLinkInterface {
  projectId: string;
  userId: number;
  title: string;
  content: string;
}
export interface AddLinkModalProps {
  userDetails: userDetailsInterface;
  closeModal: () => void;
}