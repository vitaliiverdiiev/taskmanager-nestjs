import { TaskStatusEnum } from './../tasks.model';

export class GetTaskFilterDto {
  status: TaskStatusEnum;
  search: string;
}
