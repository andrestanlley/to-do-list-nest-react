import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { BoardDtoInput } from '../dto/board.dto';
import CreateBoardUseCase from '../../application/use-cases/create-board.usecase';
import { FindByUserUseCase } from '../../application/use-cases/find-by-user.usecase';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly createBoardUseCase: CreateBoardUseCase,
    private readonly findByUserUseCase: FindByUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: BoardDtoInput) {
    try {
      return this.createBoardUseCase.execute(createBoardDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll(@Body() userId: string) {
    return this.findByUserUseCase.execute(userId);
  }
}
