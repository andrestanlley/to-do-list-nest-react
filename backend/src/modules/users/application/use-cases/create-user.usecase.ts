import { Injectable } from '@nestjs/common';
import { AUserRepository } from '../../domain/contracts/user-repository.abstract';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repo: AUserRepository) {}

  async execute(input: CreateUserDto) {
    const user = User.create(input).toObject();
    return await this.repo.create(user);
  }
}
