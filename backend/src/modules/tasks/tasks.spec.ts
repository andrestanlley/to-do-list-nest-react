import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from './application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from './application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.usecase';
import { ATaskRepository } from './domain/contracts/task-repository.abstract';
import { ITaskOutput } from './application/contracts/task.contract';
import { messages } from 'src/shared/domain/constants/messages';
import { TasksController } from './presentation/controllers/tasks.controller';
import { FindByUserUseCase } from 'src/modules/boards/application/use-cases/find-by-user.usecase';
import { VerifyUserPermissionUseCase } from './application/use-cases/verify-user-permission';
import { IBoardOutput } from 'src/modules/boards/application/contracts/board.contract';
import { ABoardRepository } from 'src/modules/boards/domain/contracts/board-repository.abstract';
import { ToggleTaskStatusUseCase } from './application/use-cases/toggle-status.usecase';

describe('Tasks', () => {
  let controller: TasksController;
  let createTaskUseCase: CreateTaskUseCase;
  let deleteTaskUseCase: DeleteTaskUseCase;
  let findAllTaskUseCase: FindAllTasksUseCase;
  let updateTaskUseCase: UpdateTaskUseCase;
  let toggleTaskStatusUseCase: ToggleTaskStatusUseCase;

  const tasks: ITaskOutput[] = [];
  const boards: IBoardOutput[] = [
    { id: '1', name: 'Pessoal', createdAt: new Date(), user: { id: '1' } },
  ];
  const userId = '1';

  beforeEach(async () => {
    class RepoMock {
      create = jest.fn((task: ITaskOutput) => {
        tasks.push(task);
        return task;
      });
      findAll = jest.fn((boardId: string) =>
        tasks.filter((task) => task.board.id === boardId),
      );
      update = jest.fn((taskId: string, task: ITaskOutput) => {
        const idx = tasks.findIndex((task) => task.id === taskId);
        if (idx === -1) return null;
        tasks[idx] = task;
        return tasks[idx];
      });
      delete = jest.fn((taskId: string) => {
        const index = tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          tasks.splice(index, 1);
          return true;
        }
        return false;
      });
    }

    class BoardRepoMock {
      findByUser = jest.fn((userId) =>
        boards.filter((board) => board.user.id === userId),
      );
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        CreateTaskUseCase,
        FindAllTasksUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        FindByUserUseCase,
        VerifyUserPermissionUseCase,
        ToggleTaskStatusUseCase,
        { provide: ATaskRepository, useClass: RepoMock },
        { provide: ABoardRepository, useClass: BoardRepoMock },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
    findAllTaskUseCase = module.get<FindAllTasksUseCase>(FindAllTasksUseCase);
    updateTaskUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
    toggleTaskStatusUseCase = module.get<ToggleTaskStatusUseCase>(
      ToggleTaskStatusUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a new task', async () => {
    const taskDto = {
      title: 'Colher morangos',
      description: 'Colher morangos frescos no pomar',
      board: { id: '1' },
    };

    const result = await createTaskUseCase.execute(userId, taskDto);
    expect(result.id).toBeTruthy();
    expect(result.title).toEqual(taskDto.title);
    expect(result.description).toEqual(taskDto.description);
    expect(result.board.id).toEqual(taskDto.board.id);
  });

  it('Should fail on create a new task because invalid title', async () => {
    const taskDto = {
      title: '',
      description: 'Colher morangos frescos no pomar',
      board: { id: '1' },
    };

    await expect(createTaskUseCase.execute(userId, taskDto)).rejects.toThrow(
      messages.ALL_FIELDS_REQUIRED,
    );
  });

  it('Should fail on create a new task because invalid description', async () => {
    const taskDto = {
      title: 'Colher morangos',
      description: '',
      board: { id: '1' },
    };

    await expect(createTaskUseCase.execute(userId, taskDto)).rejects.toThrow(
      messages.ALL_FIELDS_REQUIRED,
    );
  });

  it('Should update a task', async () => {
    const taskDto = {
      title: 'Colher morangos',
      description: 'Colher morangos frescos no pomar',
      board: { id: '1' },
    };

    const result = await createTaskUseCase.execute(userId, taskDto);
    const update = await updateTaskUseCase.execute(userId, result.id, {
      id: result.id,
      title: 'Colher morangos a tarde',
      board: result.board,
      createdAt: result.createdAt,
      description: result.description,
      updatedAt: result.updatedAt,
    });

    expect(update?.id).toEqual(result.id);
    expect(update?.description).toEqual(result.description);
    expect(update?.title).not.toBe(result.title);
  });

  it('Should find all tasks of the board', async () => {
    const boardId = '1';

    const result = await findAllTaskUseCase.execute(userId, boardId);
    expect(result.length).toBeTruthy();
  });

  it('Should delete a task by id', async () => {
    const taskDto = {
      title: 'Colher maças',
      description: 'Colher maças no topo da montanha.',
      board: { id: '1' },
    };

    const task = await createTaskUseCase.execute(userId, taskDto);
    const totalTasks = (
      await findAllTaskUseCase.execute(userId, taskDto.board.id)
    ).length;
    await deleteTaskUseCase.execute(userId, '1', task.id);
    const newTotalTasks = (
      await findAllTaskUseCase.execute(userId, taskDto.board.id)
    ).length;
    expect(newTotalTasks).toBe(totalTasks - 1);
    expect(tasks).not.toContain(task);
    const taskFound = tasks.find((t) => t.id === task.id);
    expect(taskFound).toBeUndefined();
  });

  it('Should toggle status on task', async () => {
    const taskDto = {
      title: 'Colher maças',
      description: 'Colher maças no topo da montanha.',
      board: { id: '1' },
    };

    const task = await createTaskUseCase.execute(userId, taskDto);
    const toggledTask = await toggleTaskStatusUseCase.execute(userId, {
      id: task.id,
      title: task.title,
      board: task.board,
      createdAt: task.createdAt,
      description: task.description,
      updatedAt: task.updatedAt,
    });
    expect(task.finished).not.toBe(toggledTask?.finished);
  });
});
