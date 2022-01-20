import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../tasks.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
