import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { TaskInterface, TaskStatusEnum } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: TaskInterface[] = [];

  getAllTasks(): TaskInterface[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): TaskInterface[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }

    return tasks;
  }

  getTaskById(id: string): TaskInterface {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): TaskInterface {
    const { title, description } = createTaskDto;

    const task: TaskInterface = {
      id: uuid(),
      title,
      description,
      status: TaskStatusEnum.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatusEnum) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
