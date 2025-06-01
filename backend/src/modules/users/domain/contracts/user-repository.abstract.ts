import {
  IUserAuth,
  IUserInput,
  IUserOutput,
} from '../../application/contracts/user.contract';

export abstract class AUserRepository {
  abstract create(user: IUserInput): Promise<IUserOutput>;
  abstract findByEmail(email: string): Promise<IUserAuth | null>;
  abstract findById(userId: string): Promise<IUserAuth | null>
}
