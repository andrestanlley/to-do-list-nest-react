import { Injectable } from '@nestjs/common';
import { messages } from 'src/shared/domain/constants/messages';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hasUser = await this.findUserByEmailUseCase.execute(
      createUserDto.email,
    );
    if (hasUser) throw new Error(messages.IN_USE_EMAIL);
    const user = await this.createUserUseCase.execute(createUserDto);
    return user;
  }
}
