import { Injectable } from '@nestjs/common';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { ITaskInput } from '../contracts/task.contract';
import { Task } from '../../domain/entities/task.entity';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly repo: ATaskRepository) {}

  async execute(taskId: string, task: ITaskInput) {
    const newTask = new Task(task);
    newTask.updatedAt = new Date();
    return await this.repo.update(taskId, newTask);
  }
}
