import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { AUserRepository } from '../users/domain/contracts/user-repository.abstract';
import UserRepositoryImpl from '../users/infrastructure/database/repositories/user.repository.impl';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../users/infrastructure/database/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './infrastructure/guards/strategy/jwt-auth.strategy';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserSchema]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    JwtStrategy,
    JwtService,
    { provide: AUserRepository, useClass: UserRepositoryImpl },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
