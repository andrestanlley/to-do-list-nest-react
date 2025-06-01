import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ATaskRepository } from 'src/modules/tasks/domain/contracts/task-repository.abstract';
import {
  TaskDtoInput,
  TaskDtoOutput,
} from 'src/modules/tasks/presentation/dto/task.dto';
import { TaskSchema } from '../task.schema';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepositoryImpl implements ATaskRepository {
  constructor(
    @InjectRepository(TaskSchema)
    private readonly repo: Repository<TaskSchema>,
  ) {}

  async create(task: TaskDtoInput): Promise<TaskDtoOutput> {
    return await this.repo.save(task);
  }

  async findAll(boardId: string): Promise<TaskDtoOutput[]> {
    return await this.repo.find({
      where: {
        board_id: boardId,
      },
    });
  }

  async update(
    taskId: string,
    task: TaskDtoInput,
  ): Promise<TaskDtoOutput | null> {
    await this.repo.update(taskId, task);
    const result = await this.repo.findOne({
      where: {
        id: taskId,
      },
    });

    if (!result) return null;

    return result;
  }

  async delete(taskId: string): Promise<void> {
    await this.repo.delete(taskId);
  }
}
