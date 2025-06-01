import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ABoardRepository } from 'src/modules/boards/domain/contracts/board-repository.abstract';
import { BoardSchema } from '../schemas/board.schema';
import { Repository } from 'typeorm';
import {
  CreateBoardDto,
  CreateBoardDtoOutput,
} from 'src/modules/boards/dto/create-board.dto';
import { Board } from 'src/modules/boards/domain/entities/board.entity';

@Injectable()
export class BoardRepositoryImpl implements ABoardRepository {
  constructor(
    @InjectRepository(BoardSchema)
    private readonly repo: Repository<BoardSchema>,
  ) {}

  private toEntity(board: BoardSchema): CreateBoardDtoOutput {
    const { name, createdAt, user_id } = board;
    return Board.clone(board.id, {
      name,
      createdAt,
      user_id: user_id,
    }).toObject();
  }

  async create(board: CreateBoardDto): Promise<CreateBoardDtoOutput> {
    const newBoard = await this.repo.save(board);
    return this.toEntity(newBoard);
  }

  async findByUser(userId: string): Promise<CreateBoardDtoOutput[]> {
    const boards = await this.repo.find({
      where: {
        user_id: userId
      }
    })
    if(!boards || !boards.length) return []

    return boards.map(this.toEntity)
  }
}
