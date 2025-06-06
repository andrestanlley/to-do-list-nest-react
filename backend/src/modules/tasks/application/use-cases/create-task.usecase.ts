import { Injectable } from '@nestjs/common';
import { ITaskInput } from '../contracts/task.contract';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { Task } from '../../domain/entities/task.entity';
import { VerifyUserPermissionUseCase } from './verify-user-permission';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly repo: ATaskRepository,
    private readonly verifyUserPermissionUseCase: VerifyUserPermissionUseCase,
  ) {}

  async execute(userId: string, task: ITaskInput) {
    const newTask = new Task(task);
    await this.verifyUserPermissionUseCase.execute(userId, newTask.board.id);
    return await this.repo.create(newTask);
  }
}
