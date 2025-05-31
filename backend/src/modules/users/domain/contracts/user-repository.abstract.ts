import {
  ICreateUserUseCaseInput,
  ICreateUserUseCaseOutput,
} from '../../application/contracts/create-user.contract';
import { User } from '../entities/user.entity';

export abstract class AUserRepository {
  abstract create(
    user: ICreateUserUseCaseInput,
  ): Promise<ICreateUserUseCaseOutput>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<ICreateUserUseCaseOutput | null>;
  abstract findAll(page: number, limit: number): Promise<User[]>;
  abstract countDocuments(): Promise<number>;
}
