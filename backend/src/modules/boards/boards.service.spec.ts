import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { ABoardRepository } from './domain/contracts/board-repository.abstract';
import CreateBoardUseCase from './application/use-cases/create-board.usecase';
import { BoardRepositoryImpl } from './infrastructure/database/repositories/board.repository.impl';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardSchema } from './infrastructure/database/schemas/board.schema';
import { randomUUID } from 'crypto';
import { FindByUserUseCase } from './application/use-cases/find-by-user.usecase';
import { CreateBoardDtoOutput } from './dto/create-board.dto';
import { messages } from 'src/shared/domain/constants/messages';

describe('BoardsService', () => {
  let service: BoardsService;

  const boards: CreateBoardDtoOutput[] = [];

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn((dto) => {
        const board = { ...dto, id: randomUUID(), createdAt: new Date() };
        boards.push(board);
        return board;
      });

      findByUser = jest.fn((userId: string) =>
        boards.filter((board) => board.user_id === userId),
      );
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        CreateBoardUseCase,
        FindByUserUseCase,
        { provide: ABoardRepository, useClass: RepoMock },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a board successfully', async () => {
    const boardDTO = {
      name: 'Pessoal',
      user_id: randomUUID(),
    };

    const result = await service.create(boardDTO);
    expect(result.id).toBeTruthy();
    expect(result.name).toEqual(boardDTO.name);
    expect(result.user_id).toEqual(boardDTO.user_id);
  });

  it('should fail on create a board because invalid name', async () => {
    const boardDTO = {
      name: '',
      user_id: randomUUID(),
    };

    await expect(service.create(boardDTO)).rejects.toThrow(
      messages.INVALID_BOARD_NAME,
    );
  });

  it('should get all boards of the user successfully', async () => {
    const boardDTO = {
      name: 'Pessoal',
      user_id: randomUUID(),
    };

    await service.create(boardDTO);
    const result = await service.findAll(boardDTO.user_id);
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual(boardDTO.name);
  });
});
