import { Injectable } from '@nestjs/common';
import { TaskDtoInput } from '../../presentation/dto/task.dto';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { Task } from '../../domain/entities/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly repo: ATaskRepository) {}

  async execute(task: TaskDtoInput) {
    const newTask = Task.create(task).toObject();
    return await this.repo.create(newTask);
  }
}
