export interface ITaskInput {
  title: string;
  description: string;
  board: { id: string };
  limitDate?: Date;
  finished?: boolean;
}

export interface ITaskOutput {
  id: string;
  title: string;
  description: string;
  board: { id: string };
  createdAt: Date;
  updatedAt: Date;
  finished?: boolean;
  limitDate?: Date;
}
