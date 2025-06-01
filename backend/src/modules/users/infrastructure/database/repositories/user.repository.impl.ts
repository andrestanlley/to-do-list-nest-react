import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateUserUseCaseInput,
  ICreateUserUseCaseOutput,
} from 'src/modules/users/application/contracts/create-user.contract';
import { userDomainToApplication } from 'src/modules/users/application/mappers/user.mapper';
import { AUserRepository } from 'src/modules/users/domain/contracts/user-repository.abstract';
import { User } from 'src/modules/users/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export default class UserRepositoryImpl implements AUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repo: Repository<UserSchema>,
  ) {}

  private toEntity(user: UserSchema): User {
    return User.clone(user.id, user);
  }

  private mapperUser(dbUser: UserSchema) {
    const user = this.toEntity(dbUser);
    return userDomainToApplication(user);
  }

  async create(
    user: ICreateUserUseCaseInput,
  ): Promise<ICreateUserUseCaseOutput> {
    const newUser = await this.repo.save(user);
    return this.mapperUser(newUser);
  }

  async findByEmail(email: string): Promise<ICreateUserUseCaseOutput | null> {
    const user = await this.repo.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return this.mapperUser(user);
  }
}
