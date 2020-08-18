export interface DataAgendaInterface {
  content: string;
  created_date: string;
  id: number;
  l_first_name: string;
  l_last_name: string;
  l_username: string;
  last_update: string;
  project: number;
  tags: tagInterface[];
  title: string;
  user: number;
  version: number;
  last_user: number;
}
export interface AgendaInterface {
  data: DataAgendaInterface[];
  objects_per_page: number;
  objects_total: number;
  page_current: number;
  page_total: number;
}
export interface tagInterface {
  title: string;
  id: number;
}
export interface DeleteTagInterface {
  agendaId: number;
  tagId: number;
}

export interface UpdateAgendaContentInterface {
  id: number;
  title: string;
  content: string;
  project: string;
  user: number;
}

export interface CreateTagInterface {
  title: string;
  agendaId: number;
  projectId: string;
}
