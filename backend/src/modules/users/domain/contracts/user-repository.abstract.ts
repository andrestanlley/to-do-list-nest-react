import {
  ICreateUserUseCaseInput,
  ICreateUserUseCaseOutput,
} from '../../application/contracts/create-user.contract';

export abstract class AUserRepository {
  abstract create(
    user: ICreateUserUseCaseInput,
  ): Promise<ICreateUserUseCaseOutput>;
  abstract findByEmail(email: string): Promise<ICreateUserUseCaseOutput | null>;
}
