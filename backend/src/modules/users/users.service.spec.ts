import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/database/schemas/user.schema';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import UserRepositoryImpl from './infrastructure/database/repositories/user.repository.impl';
import { AUserRepository } from './domain/contracts/user-repository.abstract';
import { messages } from 'src/shared/domain/constants/messages';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';
import { randomUUID } from 'crypto';
import { ICreateUserUseCaseOutput } from './application/contracts/create-user.contract';

describe('UsersService', () => {
  let service: UsersService;

  const users: ICreateUserUseCaseOutput[] = [];

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn((dto) => {
        const user = { ...dto, id: randomUUID(), createdAt: new Date() };
        users.push(user);
        return user;
      });
      findByEmail = jest.fn();
    }

    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user successfully', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password@123',
    };

    const result = await service.create(userDto);
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

    await expect(service.create(userDto)).rejects.toThrow(
      messages.INVALID_EMAIL,
    );
  });

  it('should fail on register because an invalid name', async () => {
    const userDto = {
      name: '',
      email: 'john@example.com',
      password: 'Password@123',
    };

    await expect(service.create(userDto)).rejects.toThrow(
      messages.INVALID_NAME,
    );
  });

  it('should fail on register because invalid password', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'pass',
    };

    await expect(service.create(userDto)).rejects.toThrow(
      messages.INVALID_PASS,
    );
  });
});
