import { Injectable } from '@nestjs/common';
import { AUserRepository } from '../../domain/contracts/user-repository.abstract';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly repo: AUserRepository) {}

  async execute(email: string) {
    try {
      return await this.repo.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }
}
