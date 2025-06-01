import { User } from 'src/modules/users/domain/entities/user.entity';
import { UserDtoOutput } from '../../presentation/dto/user.dto';

export function userDomainToApplication(user: User): UserDtoOutput {
  const output = user.toObject();
  return {
    id: output.id,
    name: output.name,
    email: output.email,
    createdAt: output.createdAt,
    updatedAt: output.updatedAt,
  };
}
