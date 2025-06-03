import {
  ITaskInput,
  ITaskOutput,
} from '../../application/contracts/task.contract';

export abstract class ATaskRepository {
  abstract create(task: ITaskInput): Promise<ITaskOutput>;
  abstract findAll(boardId: string): Promise<ITaskOutput[]>;
  abstract update(
    taskId: string,
    task: ITaskOutput,
  ): Promise<ITaskOutput | null>;
  abstract delete(taskId: string): Promise<void>;
}
