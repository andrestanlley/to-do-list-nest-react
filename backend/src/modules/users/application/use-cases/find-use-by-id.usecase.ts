import { Injectable } from '@nestjs/common';
import { AUserRepository } from '../../domain/contracts/user-repository.abstract';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly repo: AUserRepository) {}

  async execute(id: string) {
    return await this.repo.findById(id);
  }
}
