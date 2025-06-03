import { Injectable } from '@nestjs/common';
import { ITaskOutput } from '../contracts/task.contract';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { Task } from '../../domain/entities/task.entity';
import { VerifyUserPermissionUseCase } from './verify-user-permission';

@Injectable()
export class ToggleTaskStatusUseCase {
  constructor(
    private readonly repo: ATaskRepository,
    private readonly verifyUserPermissionUseCase: VerifyUserPermissionUseCase,
  ) {}

  async execute(userId, task: ITaskOutput) {
    await this.verifyUserPermissionUseCase.execute(userId, task.board.id);
    const updateTask = new Task(task);
    updateTask.changeStatus();
    return await this.repo.update(updateTask.id, updateTask);
  }
}
