import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AUserRepository } from 'src/modules/users/domain/contracts/user-repository.abstract';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from 'src/modules/auth/application/contracts/sign-in.contract';
import { messages } from 'src/shared/domain/constants/messages';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepo: AUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userRepo.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException(messages.INVALID_TOKEN);
    }
    return payload;
  }
}
