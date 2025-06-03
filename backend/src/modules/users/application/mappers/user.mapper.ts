import { IUserOutput } from '../contracts/user.contract';

export function userDomainToApplication(user: IUserOutput): IUserOutput {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
