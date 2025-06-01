import { Injectable } from '@nestjs/common';
import { ABoardRepository } from '../../domain/contracts/board-repository.abstract';
import { Board } from '../../domain/entities/board.entity';
import { CreateBoardDto } from '../../dto/create-board.dto';

@Injectable()
export default class CreateBoardUseCase {
  constructor(private readonly repo: ABoardRepository) {}

  async execute(board: CreateBoardDto) {
    const newBoard = Board.create(board).toObject();
    return await this.repo.create(newBoard);
  }
}
