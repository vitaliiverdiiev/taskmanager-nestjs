import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../tasks-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsString()
  search?: string;
}
