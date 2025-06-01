import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './modules/boards/boards.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { typeOrmConfig } from './shared/infrastructure/database/data-source';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
