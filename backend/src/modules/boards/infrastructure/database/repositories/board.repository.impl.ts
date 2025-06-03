import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ABoardRepository } from 'src/modules/boards/domain/contracts/board-repository.abstract';
import { BoardSchema } from '../schemas/board.schema';
import { Repository } from 'typeorm';
import {
  IBoardInput,
  IBoardOutput,
} from 'src/modules/boards/application/contracts/board.contract';
import { boardDomainToApplication } from 'src/modules/boards/application/mappers/board.mapper';

@Injectable()
export class BoardRepositoryImpl implements ABoardRepository {
  constructor(
    @InjectRepository(BoardSchema)
    private readonly repo: Repository<BoardSchema>,
  ) {}

  async create(board: IBoardInput): Promise<IBoardOutput> {
    const newBoard = await this.repo.save(board);
    return boardDomainToApplication(newBoard);
  }

  async findByUser(userId: string): Promise<IBoardOutput[]> {
    const boards = await this.repo.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });
    if (!boards || !boards.length) return [];

    return boards.map(boardDomainToApplication);
  }
}
