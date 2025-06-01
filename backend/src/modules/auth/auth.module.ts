import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { AUserRepository } from '../users/domain/contracts/user-repository.abstract';
import UserRepositoryImpl from '../users/infrastructure/database/repositories/user.repository.impl';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../users/infrastructure/database/schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    JwtService,
    { provide: AUserRepository, useClass: UserRepositoryImpl },
  ],
})
export class AuthModule {}
