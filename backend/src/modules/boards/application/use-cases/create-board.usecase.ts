import { Injectable } from '@nestjs/common';
import { ABoardRepository } from '../../domain/contracts/board-repository.abstract';
import { Board } from '../../domain/entities/board.entity';
import { IBoardInput } from '../contracts/board.contract';

@Injectable()
export default class CreateBoardUseCase {
  constructor(private readonly repo: ABoardRepository) {}

  async execute(board: IBoardInput) {
    const newBoard = Board.create(board).toObject();
    return await this.repo.create(newBoard);
  }
}
