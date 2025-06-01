import { Injectable } from '@nestjs/common';
import { ABoardRepository } from '../../domain/contracts/board-repository.abstract';
import { Board } from '../../domain/entities/board.entity';
import { BoardDtoInput } from '../../presentation/dto/board.dto';

@Injectable()
export default class CreateBoardUseCase {
  constructor(private readonly repo: ABoardRepository) {}

  async execute(board: BoardDtoInput) {
    const newBoard = Board.create(board).toObject();
    return await this.repo.create(newBoard);
  }
}
