import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { AUserRepository } from 'src/modules/users/domain/contracts/user-repository.abstract';
import { randomUUID } from 'crypto';
import { User } from 'src/modules/users/domain/entities/user.entity';
import {
  ISignInUseCaseInput,
  ISignInUseCaseOutput,
} from './application/contracts/sign-in.contract';

describe('Auth', () => {
  let controller: AuthController;
  let signInUseCase: SignInUseCase;

  const users: User[] = [];

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn((dto) => {
        const user = { ...dto, id: randomUUID(), createdAt: new Date() };
        users.push(user);
        return user;
      });
      findByEmail = jest.fn();
      findById = jest.fn();
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        SignInUseCase,
        { provide: AUserRepository, useClass: RepoMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    signInUseCase = module.get<SignInUseCase>(SignInUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call signInUseCase.execute and return result', async () => {
    const input: ISignInUseCaseInput = {
      email: 'john@example.com',
      password: 'Password@123',
    };

    const mockResult: ISignInUseCaseOutput = {
      accessToken: 'fake-jwt-token',
      userId: '123',
      email: 'john@example.com',
      name: 'John Doe',
    };

    jest.spyOn(signInUseCase, 'execute').mockResolvedValue(mockResult);

    const result = await controller.signIn(input);

    expect(signInUseCase.execute).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockResult);
  });
});
