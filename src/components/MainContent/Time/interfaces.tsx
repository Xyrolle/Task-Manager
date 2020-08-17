export interface createTimePointsInterface {
  projectId: string;
  groupId: number;
  description: string;
  startTimeValue: string;
  endTimeValue: string;
  user: number;
  taskList: number;
}
export interface TimesInterface {
  data: TimeGroupInterface[];
  objects_per_page: number;
  objects_total: number;
  page_current: number;
  page_total: number;
}
export interface TimeGroupInterface {
  date: string;
  id: number;
  project: number;
  times_points: number[];
}

export interface TimePointInterface {
  description: string;
  id: number;
  task_list: number;
  time_end: string;
  time_start: string;
  user: number;
}