import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../tasks-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
