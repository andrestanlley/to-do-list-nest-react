import { Test, TestingModule } from '@nestjs/testing';
import { ABoardRepository } from '../../domain/contracts/board-repository.abstract';
import CreateBoardUseCase from '../../application/use-cases/create-board.usecase';
import { randomUUID } from 'crypto';
import { FindByUserUseCase } from '../../application/use-cases/find-by-user.usecase';
import { BoardDtoOutput } from '../dto/board.dto';
import { messages } from 'src/shared/domain/constants/messages';
import { BoardsController } from './boards.controller';

describe('BoardsController', () => {
  let controller: BoardsController;

  const boards: BoardDtoOutput[] = [];

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
      controllers: [BoardsController],
      providers: [
        CreateBoardUseCase,
        FindByUserUseCase,
        { provide: ABoardRepository, useClass: RepoMock },
      ],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a board successfully', async () => {
    const boardDTO = {
      name: 'Pessoal',
      user_id: randomUUID(),
    };

    const result = await controller.create(boardDTO);
    expect(result.id).toBeTruthy();
    expect(result.name).toEqual(boardDTO.name);
    expect(result.user_id).toEqual(boardDTO.user_id);
  });

  it('should fail on create a board because invalid name', async () => {
    const boardDTO = {
      name: '',
      user_id: randomUUID(),
    };

    await expect(controller.create(boardDTO)).rejects.toThrow(
      messages.INVALID_BOARD_NAME,
    );
  });

  it('should get all boards of the user successfully', async () => {
    const boardDTO = {
      name: 'Pessoal',
      user_id: randomUUID(),
    };

    await controller.create(boardDTO);
    const result = await controller.findAll(boardDTO.user_id);
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual(boardDTO.name);
  });
});
