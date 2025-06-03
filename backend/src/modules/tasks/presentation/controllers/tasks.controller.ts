import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import {
  ITaskInput,
  ITaskOutput,
} from '../../application/contracts/task.contract';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from '../../application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.usecase';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { ToggleTaskStatusUseCase } from '../../application/use-cases/toggle-status.usecase';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly toggleTaskStatusUseCase: ToggleTaskStatusUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req, @Body() task: ITaskInput) {
    const userId = req.user.sub;
    return await this.createTaskUseCase.execute(userId, task);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req, @Query() query: { boardId: string }) {
    const { boardId } = query;
    const userId = req.user.sub;
    const result = await this.findAllTasksUseCase.execute(userId, boardId);
    if (!result.length) return [];
    return result;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() task: ITaskOutput,
  ) {
    const userId = req.user.sub;
    return await this.updateTaskUseCase.execute(userId, id, task);
  }

  @Delete(':boardId/:id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Request() req,
    @Param('boardId') boardId: string,
    @Param('id') id: string,
  ) {
    const userId = req.user.sub;
    return await this.deleteTaskUseCase.execute(userId, boardId, id);
  }

  @Put('/toggle/:id')
  @UseGuards(JwtAuthGuard)
  async toggleStatus(@Request() req, @Body() task: ITaskOutput) {
    const userId = req.user.sub;
    return await this.toggleTaskStatusUseCase.execute(userId, task);
  }
}
