
export interface CreateProjectInterface {
  name: string;
  description: string;
  company: string;
}
export interface ProjectInterface {
  company: string;
  description: string;
  id: number;
  name: string;
}
export interface ProjectsInterface {
  data: ProjectInterface[];
  objects_per_page: number;
  objects_total: number;
  page_current: number;
  page_total: number;
}
