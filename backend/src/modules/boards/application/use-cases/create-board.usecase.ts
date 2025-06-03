import { Injectable } from '@nestjs/common';
import { ABoardRepository } from '../../domain/contracts/board-repository.abstract';
import { Board } from '../../domain/entities/board.entity';
import { IBoardInput } from '../contracts/board.contract';

@Injectable()
export default class CreateBoardUseCase {
  constructor(private readonly repo: ABoardRepository) {}

  async execute(userId: string, board: IBoardInput) {
    const newBoard = new Board(board);
    newBoard.user = {
      id: userId,
    };
    return await this.repo.create(newBoard);
  }
}
