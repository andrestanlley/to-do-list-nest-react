import { AuthenticatedUser } from '../../domain/entities/auth.entity';
import { ISignInUseCaseOutput } from '../contracts/sign-in.contract';

export function authenticatedUserDomainToApplication(
  authenticatedUser: AuthenticatedUser,
): ISignInUseCaseOutput {
  return {
    name: authenticatedUser.getName(),
    email: authenticatedUser.getEmail(),
    accessToken: authenticatedUser.getAccessToken(),
    userId: authenticatedUser.getUserId(),
  };
}
