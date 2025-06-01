import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { TaskDtoInput } from '../dto/task.dto';
import { Response } from 'express';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from '../../application/use-cases/find-all-task.usecase';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.usecase';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() TaskDtoInput: TaskDtoInput) {
    try {
      return await this.createTaskUseCase.execute(TaskDtoInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Body() boardId: string) {
    try {
      const result = await this.findAllTasksUseCase.execute(boardId);
      if (!result.length) return [];
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: TaskDtoInput) {
    return await this.updateTaskUseCase.execute(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteTaskUseCase.execute(id);
  }
}
