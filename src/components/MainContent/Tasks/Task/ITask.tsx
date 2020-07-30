export interface ITag {
	id: string;
	title: string;
}

export interface ITask {
	title: string;
	description: string;
	creationDate: string;
	id: string;
	list_id?: string;
	tags: ITag[];
}
