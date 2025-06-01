import { Injectable } from '@nestjs/common';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';

@Injectable()
export class FindAllTasksUseCase {
  constructor(private readonly repo: ATaskRepository) {}

  async execute(boardId: string) {
    return await this.repo.findAll(boardId);
  }
}
