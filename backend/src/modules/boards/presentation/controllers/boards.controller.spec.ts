import { Test, TestingModule } from '@nestjs/testing';
import { ABoardRepository } from '../../domain/contracts/board-repository.abstract';
import CreateBoardUseCase from '../../application/use-cases/create-board.usecase';
import { randomUUID } from 'crypto';
import { FindByUserUseCase } from '../../application/use-cases/find-by-user.usecase';
import { IBoardOutput } from '../../application/contracts/board.contract';
import { messages } from 'src/shared/domain/constants/messages';
import { BoardsController } from './boards.controller';

describe('BoardsController', () => {
  let controller: BoardsController;
  let findByUserUseCase: FindByUserUseCase;
  let createBoardUseCase: CreateBoardUseCase;

  const boards: IBoardOutput[] = [];

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn((dto) => {
        boards.push(dto);
        return dto;
      });

      findByUser = jest.fn((userId: string) =>
        boards.filter((board) => board.user.id === userId),
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
    findByUserUseCase = module.get<FindByUserUseCase>(FindByUserUseCase);
    createBoardUseCase = module.get<CreateBoardUseCase>(CreateBoardUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a board successfully', async () => {
    const boardDTO = {
      name: 'Pessoal',
      user: { id: randomUUID() },
    };

    const result = await createBoardUseCase.execute(boardDTO.user.id, boardDTO);
    expect(result.id).toBeTruthy();
    expect(result.name).toEqual(boardDTO.name);
    expect(result.user).toEqual(boardDTO.user);
  });

  it('should fail on create a board because invalid name', async () => {
    const boardDTO = {
      name: '',
      user: { id: randomUUID() },
    };

    await expect(
      createBoardUseCase.execute(boardDTO.user.id, boardDTO),
    ).rejects.toThrow(messages.INVALID_BOARD_NAME);
  });

  it('should get all boards of the user successfully', async () => {
    const boardDTO = {
      name: 'Pessoal',
      user: { id: randomUUID() },
    };

    await createBoardUseCase.execute(boardDTO.user.id, boardDTO);
    const result = await findByUserUseCase.execute(boardDTO.user.id);
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual(boardDTO.name);
  });
});
