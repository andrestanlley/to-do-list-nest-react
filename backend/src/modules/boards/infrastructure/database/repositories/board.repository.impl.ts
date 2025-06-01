import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ABoardRepository } from 'src/modules/boards/domain/contracts/board-repository.abstract';
import { BoardSchema } from '../schemas/board.schema';
import { Repository } from 'typeorm';
import {
  IBoardInput,
  IBoardOutput,
} from 'src/modules/boards/application/contracts/board.contract';
import { Board } from 'src/modules/boards/domain/entities/board.entity';

@Injectable()
export class BoardRepositoryImpl implements ABoardRepository {
  constructor(
    @InjectRepository(BoardSchema)
    private readonly repo: Repository<BoardSchema>,
  ) {}

  private toEntity(board: BoardSchema): IBoardOutput {
    const { name, createdAt, user_id } = board;
    return Board.clone(board.id, {
      name,
      createdAt,
      user_id: user_id,
    }).toObject();
  }

  async create(board: IBoardInput): Promise<IBoardOutput> {
    const newBoard = await this.repo.save(board);
    return this.toEntity(newBoard);
  }

  async findByUser(userId: string): Promise<IBoardOutput[]> {
    const boards = await this.repo.find({
      where: {
        user_id: userId,
      },
    });
    if (!boards || !boards.length) return [];

    return boards.map(this.toEntity);
  }
}
