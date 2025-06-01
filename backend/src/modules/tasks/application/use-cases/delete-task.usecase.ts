import { Injectable } from '@nestjs/common';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly repo: ATaskRepository) {}

  async execute(taskId: string) {
    return await this.repo.delete(taskId);
  }
}
