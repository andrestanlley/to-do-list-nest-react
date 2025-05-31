import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import UserRepositoryImpl from './infrastructure/database/repositories/user.repository.impl';
import { AUserRepository } from './domain/contracts/user-repository.abstract';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';
import { UserSchema } from './infrastructure/database/schemas/user.schema';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        CreateUserUseCase,
        FindUserByEmailUseCase,
        {
          provide: AUserRepository,
          useClass: UserRepositoryImpl,
        },
        {
          provide: getRepositoryToken(UserSchema),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
