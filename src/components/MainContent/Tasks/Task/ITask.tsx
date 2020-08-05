export interface ITag {
	id: string;
	title: string;
}

export interface ITask {
	title: string;
	description: string;
	creationDate: string;
	id: string;
	task_list: string;
	tags: ITag[];
	parent?: [];
	contributors?: [];
}
