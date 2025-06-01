import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { AUserRepository } from './domain/contracts/user-repository.abstract';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn();
      findByEmail = jest.fn();
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        CreateUserUseCase,
        FindUserByEmailUseCase,
        {
          provide: AUserRepository,
          useClass: RepoMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
