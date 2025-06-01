import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignInUseCase } from '../../application/use-cases/sign-in.usecase';
import { ISignInUseCaseInput } from '../../application/contracts/sign-in.contract';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('login')
  @HttpCode(200)
  async signIn(@Body() body: ISignInUseCaseInput) {
    return await this.signInUseCase.execute(body);
  }
}
