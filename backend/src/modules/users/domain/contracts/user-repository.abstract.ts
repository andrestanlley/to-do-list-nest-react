import { UserDtoInput, UserDtoOutput } from '../../presentation/dto/user.dto';

export abstract class AUserRepository {
  abstract create(user: UserDtoInput): Promise<UserDtoOutput>;
  abstract findByEmail(email: string): Promise<UserDtoOutput | null>;
}
