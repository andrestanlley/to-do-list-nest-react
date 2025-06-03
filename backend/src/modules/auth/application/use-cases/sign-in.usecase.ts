import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IJwtPayload,
  ISignInUseCaseInput,
  ISignInUseCaseOutput,
} from '../contracts/sign-in.contract';
import { JwtService } from '@nestjs/jwt';
import { AUserRepository } from 'src/modules/users/domain/contracts/user-repository.abstract';
import * as bcrypt from 'bcryptjs';
import { AuthenticatedUser } from '../../domain/entities/auth.entity';
import { authenticatedUserDomainToApplication } from '../mapper/sign-in.mapper';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: AUserRepository,
  ) {}

  async execute(signIn: ISignInUseCaseInput): Promise<ISignInUseCaseOutput> {
    const user = await this.userRepository.findByEmail(signIn.email);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = bcrypt.compareSync(signIn.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    const jwtPayload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '4h',
    });

    const output = new AuthenticatedUser(
      accessToken,
      user.id,
      user.email,
      user.name,
    );
    return authenticatedUserDomainToApplication(output);
  }
}
