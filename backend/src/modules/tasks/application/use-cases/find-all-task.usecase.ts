import { Injectable } from '@nestjs/common';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { VerifyUserPermissionUseCase } from './verify-user-permission';

@Injectable()
export class FindAllTasksUseCase {
  constructor(
    private readonly repo: ATaskRepository,
    private readonly verifyUserPermissionUseCase: VerifyUserPermissionUseCase,
  ) {}

  async execute(userId: string, boardId: string) {
    await this.verifyUserPermissionUseCase.execute(userId, boardId);
    return await this.repo.findAll(boardId);
  }
}
