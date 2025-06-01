import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchema } from './infrastructure/database/schemas/task.schema';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from './application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from './application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.usecase';
import { ATaskRepository } from './domain/contracts/task-repository.abstract';
import { TaskRepositoryImpl } from './infrastructure/database/schemas/repositories/task-repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([TaskSchema])],
  controllers: [TasksController],
  providers: [
    TasksService,
    CreateTaskUseCase,
    FindAllTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    { provide: ATaskRepository, useClass: TaskRepositoryImpl },
  ],
})
export class TasksModule {}
