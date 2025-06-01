export class TaskDtoInput {
  title: string;
  description: string;
  board_id: string;
}

export class TaskDtoOutput {
  id: string;
  title: string;
  description: string;
  board_id: string;
  createdAt: Date;
  updatedAt: Date;
}
