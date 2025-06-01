import { PartialType } from '@nestjs/mapped-types';
import { TaskDtoInput } from './create-task.dto';

export class UpdateTaskDto extends PartialType(TaskDtoInput) {}
