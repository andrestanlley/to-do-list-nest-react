import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/database/schemas/user.schema';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import UserRepositoryImpl from './infrastructure/database/repositories/user.repository.impl';
import { AUserRepository } from './domain/contracts/user-repository.abstract';
import { messages } from 'src/shared/domain/constants/messages';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';

describe('UsersService', () => {
  let service: UsersService;
  let repo: any;

  beforeEach(async () => {
    const repoMock = {
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn((dto) => dto),
      insert: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
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
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(UserSchema));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user successfully', async () => {
    repo.findOne.mockResolvedValue(null);
    repo.save.mockImplementation((user) => Promise.resolve({ id: 1, ...user }));

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
    repo.findOne.mockResolvedValue(null);
    repo.save.mockImplementation((user) => Promise.resolve({ id: 1, ...user }));

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
    repo.findOne.mockResolvedValue(null);
    repo.save.mockImplementation((user) => Promise.resolve({ id: 1, ...user }));

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
    repo.findOne.mockResolvedValue(null);
    repo.save.mockImplementation((user) => Promise.resolve({ id: 1, ...user }));

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
