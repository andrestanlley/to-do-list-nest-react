import { AuthenticatedUser } from "../../domain/entities/auth.entity";
import { ISignInUseCaseOutput } from "../contracts/sign-in.contract";

export function authenticatedUserDomainToApplication(
  authenticatedUser: AuthenticatedUser,
): ISignInUseCaseOutput {
  const output = authenticatedUser.toObject();
  return {
    name: output.name,
    email: output.email,
    accessToken: output.accessToken,
    userId: output.userId,
  };
}