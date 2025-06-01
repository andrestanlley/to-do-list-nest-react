import { Injectable } from '@nestjs/common';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { ITaskInput } from '../contracts/task.contract';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly repo: ATaskRepository) {}

  async execute(taskId: string, task: ITaskInput) {
    return await this.repo.update(taskId, task);
  }
}
