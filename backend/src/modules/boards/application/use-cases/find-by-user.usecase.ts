import { Injectable } from '@nestjs/common';
import { ABoardRepository } from '../../domain/contracts/board-repository.abstract';

@Injectable()
export class FindByUserUseCase {
  constructor(private readonly repo: ABoardRepository) {}

  execute(userId: string) {
    return this.repo.findByUser(userId);
  }
}
