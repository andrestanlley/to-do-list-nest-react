import { Module } from '@nestjs/common';
import { TasksController } from './presentation/controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchema } from './infrastructure/database/schemas/task.schema';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from './application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from './application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.usecase';
import { ATaskRepository } from './domain/contracts/task-repository.abstract';
import { TaskRepositoryImpl } from './infrastructure/database/repositories/task-repository.impl';
import { FindByUserUseCase } from '../boards/application/use-cases/find-by-user.usecase';
import { VerifyUserPermissionUseCase } from './application/use-cases/verify-user-permission';
import { BoardSchema } from '../boards/infrastructure/database/schemas/board.schema';
import { ABoardRepository } from '../boards/domain/contracts/board-repository.abstract';
import { BoardRepositoryImpl } from '../boards/infrastructure/database/repositories/board.repository.impl';
import { ToggleTaskStatusUseCase } from './application/use-cases/toggle-status.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TaskSchema, BoardSchema])],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    FindAllTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    FindByUserUseCase,
    VerifyUserPermissionUseCase,
    ToggleTaskStatusUseCase,
    { provide: ATaskRepository, useClass: TaskRepositoryImpl },
    { provide: ABoardRepository, useClass: BoardRepositoryImpl },
  ],
})
export class TasksModule {}
