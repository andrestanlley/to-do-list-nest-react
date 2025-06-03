export interface ITask {
	id?: string;
	title: string;
	description: string;
	limitDate?: Date;
	finished?: boolean;
	board: { id: string };
}
