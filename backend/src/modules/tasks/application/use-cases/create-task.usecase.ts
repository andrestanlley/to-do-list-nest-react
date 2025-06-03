import { Injectable } from '@nestjs/common';
import { ITaskInput } from '../contracts/task.contract';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { Task } from '../../domain/entities/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly repo: ATaskRepository) {}

  async execute(task: ITaskInput) {
    const newTask = new Task(task);
    return await this.repo.create(newTask);
  }
}
