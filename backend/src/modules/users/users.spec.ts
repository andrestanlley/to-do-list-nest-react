import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { AUserRepository } from './domain/contracts/user-repository.abstract';
import { messages } from 'src/shared/domain/constants/messages';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';
import { UsersController } from './presentation/controllers/users.controller';
import { IUserOutput } from './application/contracts/user.contract';

describe('Users', () => {
  let controller: UsersController;

  const users: IUserOutput[] = [];

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn((dto) => {
        users.push(dto);
        return dto;
      });
      findByEmail = jest.fn();
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
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

  it('should register a user successfully', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password@123',
    };

    const result = await controller.create(userDto);
    expect(result.id).toBeTruthy();
    expect(result.name).toEqual(userDto.name);
    expect(result.email).toEqual(userDto.email);
  });

  it('should fail on register because an invalid email', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'joao',
      password: 'Password@123',
    };

    await expect(controller.create(userDto)).rejects.toThrow(
      messages.INVALID_EMAIL,
    );
  });

  it('should fail on register because an invalid name', async () => {
    const userDto = {
      name: '',
      email: 'john@example.com',
      password: 'Password@123',
    };

    await expect(controller.create(userDto)).rejects.toThrow(
      messages.INVALID_NAME,
    );
  });

  it('should fail on register because invalid password', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'pass',
    };

    await expect(controller.create(userDto)).rejects.toThrow(
      messages.INVALID_PASS,
    );
  });
});
