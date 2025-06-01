import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UserDtoInput } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: UserDtoInput) {
    try {
      return await this.createUserUseCase.execute(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
