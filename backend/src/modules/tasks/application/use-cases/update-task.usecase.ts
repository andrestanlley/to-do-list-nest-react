import { Injectable } from '@nestjs/common';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { ITaskOutput } from '../contracts/task.contract';
import { Task } from '../../domain/entities/task.entity';
import { VerifyUserPermissionUseCase } from './verify-user-permission';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    private readonly repo: ATaskRepository,
    private readonly verifyUserPermissionUseCase: VerifyUserPermissionUseCase,
  ) {}

  async execute(userId: string, taskId: string, task: ITaskOutput) {
    await this.verifyUserPermissionUseCase.execute(userId, task.board.id);
    const newTask = new Task(task);
    newTask.updatedAt = new Date();
    return await this.repo.update(taskId, newTask);
  }
}
