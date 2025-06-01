import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/database/schemas/user.schema';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import UserRepositoryImpl from './infrastructure/database/repositories/user.repository.impl';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.usecase';
import { AUserRepository } from './domain/contracts/user-repository.abstract';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserByEmailUseCase,
    { provide: AUserRepository, useClass: UserRepositoryImpl },
  ],
})
export class UsersModule {}
