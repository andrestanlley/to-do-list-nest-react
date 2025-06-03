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
} from '@nestjs/common';
import { ITaskInput } from '../../application/contracts/task.contract';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from '../../application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.usecase';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() ITaskInput: ITaskInput) {
    return await this.createTaskUseCase.execute(ITaskInput);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: { boardId: string }) {
    const { boardId } = query;
    const result = await this.findAllTasksUseCase.execute(boardId);
    if (!result.length) return [];
    return result;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() task: ITaskInput) {
    return await this.updateTaskUseCase.execute(id, task);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.deleteTaskUseCase.execute(id);
  }
}
