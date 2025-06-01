import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from './application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from './application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.usecase';
import { TaskDtoInput } from './dto/create-task.dto';
import { ATaskRepository } from './domain/contracts/task-repository.abstract';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn();
      findAll = jest.fn((board: string) => board);
      update = jest.fn((taskId: string, task: TaskDtoInput) => task);
      delete = jest.fn();
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        CreateTaskUseCase,
        FindAllTasksUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        { provide: ATaskRepository, useClass: RepoMock },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
