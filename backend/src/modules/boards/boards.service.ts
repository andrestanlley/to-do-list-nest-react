import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import CreateBoardUseCase from './application/use-cases/create-board.usecase';
import { FindByUserUseCase } from './application/use-cases/find-by-user.usecase';

@Injectable()
export class BoardsService {
  constructor(
    private readonly createBoardUseCase: CreateBoardUseCase,
    private readonly findByUserUseCase: FindByUserUseCase,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    return await this.createBoardUseCase.execute(createBoardDto);
  }

  async findAll(userId: string) {
    return await this.findByUserUseCase.execute(userId);
  }
}
