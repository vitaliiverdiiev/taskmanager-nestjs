import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TasksRepository } from './task.repository';
import { TaskStatusEnum } from './tasks-status.enum';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: '17051992',
  username: 'vitaliiverdiiev',
  password: 'B1Gb@nkTAKE$lidlBANK',
  tasks: [],
};

const mockTask = {
  id: '19920517',
  title: 'Get some boolochki',
  description: 'From the pekarnya',
  status: TaskStatusEnum.OPEN,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  //   let tasksRepository: TasksRepository;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('SomeValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('SomeValue');
    });
  });

  describe('geyTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('19920517', mockUser);
      expect(result).toEqual(mockTask);
    });
  });

  describe('geyTaskById', () => {
    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('19921705', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
