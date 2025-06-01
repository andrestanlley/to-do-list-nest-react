import { TaskDtoInput, TaskDtoOutput } from '../../dto/create-task.dto';

export abstract class ATaskRepository {
  abstract create(task: TaskDtoInput): Promise<TaskDtoOutput>;
  abstract findAll(boardId: string): Promise<TaskDtoOutput[]>;
  abstract update(
    taskId: string,
    task: TaskDtoInput,
  ): Promise<TaskDtoOutput | null>;
  abstract delete(taskId: string): Promise<void>;
}
