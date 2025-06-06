import { Injectable } from '@nestjs/common';
import { AUserRepository } from '../../domain/contracts/user-repository.abstract';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly repo: AUserRepository) {}

  async execute(email: string) {
    return await this.repo.findByEmail(email);
  }
}
