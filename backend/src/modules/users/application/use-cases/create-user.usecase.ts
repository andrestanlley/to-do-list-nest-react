import { BadRequestException, Injectable } from '@nestjs/common';
import { AUserRepository } from '../../domain/contracts/user-repository.abstract';
import { IUserInput } from '../contracts/user.contract';
import { User } from '../../domain/entities/user.entity';
import { FindUserByEmailUseCase } from './find-user-by-email.usecase';
import { messages } from 'src/shared/domain/constants/messages';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly repo: AUserRepository,
  ) {}

  async execute(input: IUserInput) {
    const user = new User(input);
    const hasUser = await this.findUserByEmailUseCase.execute(input.email);
    if (hasUser) throw new BadRequestException(messages.IN_USE_EMAIL);
    return await this.repo.create(user);
  }
}
