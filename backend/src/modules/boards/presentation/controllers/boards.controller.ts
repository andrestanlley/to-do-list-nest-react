import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IBoardInput } from '../../application/contracts/board.contract';
import CreateBoardUseCase from '../../application/use-cases/create-board.usecase';
import { FindByUserUseCase } from '../../application/use-cases/find-by-user.usecase';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly createBoardUseCase: CreateBoardUseCase,
    private readonly findByUserUseCase: FindByUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() board: IBoardInput) {
    const userId = req.user.sub;
    return this.createBoardUseCase.execute(userId, board);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const userId = req.user.sub;
    return this.findByUserUseCase.execute(userId);
  }
}
