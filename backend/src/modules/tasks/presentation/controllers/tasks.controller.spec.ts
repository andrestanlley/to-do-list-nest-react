import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from '../../application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.usecase';
import { ATaskRepository } from '../../domain/contracts/task-repository.abstract';
import { ITaskOutput } from '../../application/contracts/task.contract';
import { messages } from 'src/shared/domain/constants/messages';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;

  const tasks: ITaskOutput[] = [];

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

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
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

  it('Should create a new task', async () => {
    const taskDto = {
      title: 'Colher morangos',
      description: 'Colher morangos frescos no pomar',
      board: { id: '1' },
    };

    const result = await controller.create(taskDto);
    expect(result.id).toBeTruthy();
    expect(result.title).toEqual(taskDto.title);
    expect(result.description).toEqual(taskDto.description);
    expect(result.board.id).toEqual({ boardId: taskDto.board.id });
  });

  it('Should fail on create a new task because invalid title', async () => {
    const taskDto = {
      title: '',
      description: 'Colher morangos frescos no pomar',
      board: { id: '1' },
    };

    await expect(controller.create(taskDto)).rejects.toThrow(
      messages.ALL_FIELDS_REQUIRED,
    );
  });

  it('Should fail on create a new task because invalid description', async () => {
    const taskDto = {
      title: 'Colher morangos',
      description: '',
      board: { id: '1' },
    };

    await expect(controller.create(taskDto)).rejects.toThrow(
      messages.ALL_FIELDS_REQUIRED,
    );
  });

  it('Should update a task', async () => {
    const taskDto = {
      title: 'Colher morangos',
      description: 'Colher morangos frescos no pomar',
      board: { id: '1' },
    };

    const result = await controller.create(taskDto);
    const update = await controller.update(result.id, {
      ...taskDto,
      title: 'Colher morangos a tarde',
    });

    expect(update?.id).toEqual(result.id);
    expect(update?.description).toEqual(result.description);
    expect(update?.title).not.toBe(result.title);
  });

  it('Should find all tasks of the board', async () => {
    const boardId = '1';

    const result = await controller.findAll({ boardId });
    expect(result.length).toBeTruthy();
  });

  it('Should delete a task by id', async () => {
    const taskDto = {
      title: 'Colher maças',
      description: 'Colher maças no topo da montanha.',
      board: { id: '1' },
    };

    const task = await controller.create(taskDto);
    const totalTasks = (await controller.findAll({ boardId: taskDto.board.id }))
      .length;
    await controller.remove(task.id);
    const newTotalTasks = (
      await controller.findAll({ boardId: taskDto.board.id })
    ).length;
    expect(newTotalTasks).toBe(totalTasks - 1);
    expect(tasks).not.toContain(task);
    const taskFound = tasks.find((t) => t.id === task.id);
    expect(taskFound).toBeUndefined();
  });
});
