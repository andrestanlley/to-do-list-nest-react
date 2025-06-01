import { Injectable } from '@nestjs/common';
import { TaskDtoInput } from './dto/create-task.dto';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from './application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from './application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.usecase';

@Injectable()
export class TasksService {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async create(task: TaskDtoInput) {
    return this.createTaskUseCase.execute(task);
  }

  async findAll(boardId: string) {
    return await this.findAllTasksUseCase.execute(boardId);
  }

  async update(taskId: string, task: TaskDtoInput) {
    return this.updateTaskUseCase.execute(taskId, task);
  }

  async remove(taskId: string) {
    return this.deleteTaskUseCase.execute(taskId);
  }
}
