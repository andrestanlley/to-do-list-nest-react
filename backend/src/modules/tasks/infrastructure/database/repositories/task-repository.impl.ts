import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ATaskRepository } from 'src/modules/tasks/domain/contracts/task-repository.abstract';
import {
  ITaskInput,
  ITaskOutput,
} from 'src/modules/tasks/application/contracts/task.contract';
import { TaskSchema } from '../schemas/task.schema';
import { Repository } from 'typeorm';
import { taskDomainToApplication } from 'src/modules/tasks/application/mappers/task.mapper.ts';

@Injectable()
export class TaskRepositoryImpl implements ATaskRepository {
  constructor(
    @InjectRepository(TaskSchema)
    private readonly repo: Repository<TaskSchema>,
  ) {}

  async create(task: ITaskInput): Promise<ITaskOutput> {
    const newTask = await this.repo.save(task);
    return taskDomainToApplication(newTask);
  }

  async findAll(boardId: string): Promise<ITaskOutput[]> {
    const tasks = await this.repo.find({
      where: {
        board: { id: boardId },
      },
    });

    if (!tasks || !tasks.length) return [];

    return tasks.map(taskDomainToApplication);
  }

  async update(taskId: string, task: ITaskOutput): Promise<ITaskOutput | null> {
    await this.repo.update(taskId, taskDomainToApplication(task));
    const result = await this.repo.findOne({
      where: {
        id: taskId,
      },
    });

    if (!result) return null;

    return taskDomainToApplication(result);
  }

  async delete(taskId: string): Promise<void> {
    await this.repo.delete(taskId);
  }
}
