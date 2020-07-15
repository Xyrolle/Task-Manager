
export interface AgendaInterface {
    id: number;
    title: string;
    content: string;
    created_date: Date;
    last_update: Date;
    version: number;
    project: number;
    user: number;
    last_user: number;
    tags: string[];
}