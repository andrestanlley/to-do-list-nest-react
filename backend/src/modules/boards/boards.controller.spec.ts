import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { ABoardRepository } from './domain/contracts/board-repository.abstract';
import CreateBoardUseCase from './application/use-cases/create-board.usecase';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardSchema } from './infrastructure/database/schemas/board.schema';
import { BoardRepositoryImpl } from './infrastructure/database/repositories/board.repository.impl';
import { FindByUserUseCase } from './application/use-cases/find-by-user.usecase';

describe('BoardsController', () => {
  let controller: BoardsController;
  let repo: ABoardRepository;

  beforeEach(async () => {
    const repoMock = {
      save: jest.fn((dto) => dto),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        BoardsService,
        CreateBoardUseCase,
        FindByUserUseCase,
        { provide: ABoardRepository, useClass: BoardRepositoryImpl },
        { provide: getRepositoryToken(BoardSchema), useValue: repoMock },
      ],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    repo = module.get(getRepositoryToken(BoardSchema));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
