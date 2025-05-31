import { User } from 'src/modules/users/domain/entities/user.entity';
import { ICreateUserUseCaseOutput } from '../contracts/create-user.contract';

export function userDomainToApplication(user: User): ICreateUserUseCaseOutput {
  const output = user.toObject();
  return {
    id: output.id,
    name: output.name,
    email: output.email,
  };
}
