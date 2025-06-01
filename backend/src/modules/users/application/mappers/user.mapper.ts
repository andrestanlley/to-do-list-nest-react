import { User } from 'src/modules/users/domain/entities/user.entity';
import { IUserOutput } from '../contracts/user.contract';

export function userDomainToApplication(user: User): IUserOutput {
  const output = user.toObject();
  return {
    id: output.id,
    name: output.name,
    email: output.email,
    createdAt: output.createdAt,
    updatedAt: output.updatedAt,
  };
}
