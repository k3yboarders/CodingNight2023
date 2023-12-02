import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: DbService) {}

  async createTask(task: TaskDto): Promise<number> {
    const createdTask = await this.prisma.task.create({
      data: {
        name: task.name,
        urgency: task.urgency,
        longitude: task.longitude,
        latitude: task.latitude,
        date: task.date,
      },
    });
    return createdTask.id;
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async getTasks(
    page = 1,
    search?: string,
    isCompleted = false,
  ): Promise<object> {
    let whereParams: any = {};
    whereParams.isCompleted = Boolean(isCompleted);
    if (search) {
      whereParams = {
        name: {
          contains: search,
        },
      };
    }
    const tasks = await this.prisma.task.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: whereParams,
      select: {
        id: true,
        name: true,
        urgency: true,
        longitude: true,
        latitude: true,
        isCompleted: true,
        date: true,
      },
    });
    return {
      data: tasks,
      totalItems: await this.prisma.task.count({ where: whereParams }),
      totalPages: Math.ceil((await this.prisma.task.count()) / 10),
    };
  }
  async getAllTasksWithoutPaginating(): Promise<object> {
    return await this.prisma.task.findMany({
      select: {
        id: true,
        name: true,
        urgency: true,
        longitude: true,
        latitude: true,
        isCompleted: true,
        date: true,
      },
    });
  }

  async updateTask(taskId: number, task: TaskDto): Promise<void> {
    await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name: task.name,
        urgency: task.urgency,
        longitude: task.longitude,
        latitude: task.latitude,
        date: task.date,
      },
    });
  }

  async getUsersTask(userId: number, isCompleted = false): Promise<object> {
    const tasks = await this.prisma.volunteerTask.findMany({
      where: {
        userId: userId,
        task: {
          isCompleted: isCompleted,
        },
      },
      select: {
        task: {
          select: {
            id: true,
            name: true,
            urgency: true,
            longitude: true,
            latitude: true,
            isCompleted: true,
            date: true,
          },
        },
      },
    });
    return tasks.map((task) => task.task);
  }

  async assignTaskToVolunteer(
    taskId: number,
    volunteerId: number,
  ): Promise<void> {
    await this.prisma.volunteerTask.create({
      data: {
        taskId: taskId,
        userId: volunteerId,
      },
    });
  }

  async completeTask(taskId: number, userId: number): Promise<void> {
    const task = await this.prisma.volunteerTask.findFirst({
      where: {
        taskId: taskId,
        userId: userId,
      },
      select: {
        userId: true,
        task: {
          select: {
            isCompleted: true,
          },
        },
      },
    });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (task.userId !== userId && user.type !== 'ADMIN') {
      throw new HttpException(
        'You are not authorized to complete this task',
        403,
      );
    }
    await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isCompleted: task.task.isCompleted ? false : true,
      },
    });
  }
}
