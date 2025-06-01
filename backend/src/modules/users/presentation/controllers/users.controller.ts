import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { IUserInput } from '../../application/contracts/user.contract';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: IUserInput) {
    try {
      return await this.createUserUseCase.execute(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
