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
import { TasksService } from './tasks.service';
import { TaskDtoInput } from './dto/create-task.dto';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() TaskDtoInput: TaskDtoInput) {
    try {
      return await this.tasksService.create(TaskDtoInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const boardId = '';
      const result = await this.tasksService.findAll(boardId);
      if (!result.length) return res.status(HttpStatus.NO_CONTENT).send();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: TaskDtoInput) {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(id);
  }
}
