export interface ITaskInput {
  title: string;
  description: string;
  board_id: string;
}

export interface ITaskOutput {
  id: string;
  title: string;
  description: string;
  board_id: string;
  createdAt: Date;
  updatedAt: Date;
}
