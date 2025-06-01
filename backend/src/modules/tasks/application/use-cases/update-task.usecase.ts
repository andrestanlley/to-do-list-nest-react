import { Injectable } from '@nestjs/common';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { TaskDtoInput } from '../../dto/create-task.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly repo: ATaskRepository) {}

  async execute(taskId: string, task: TaskDtoInput) {
    return await this.repo.update(taskId, task);
  }
}
