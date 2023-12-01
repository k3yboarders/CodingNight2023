import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: DbService) {}

  async createTask(task: TaskDto): Promise<void> {
    await this.prisma.task.create({
      data: {
        name: task.name,
        urgency: task.urgency,
        longitude: task.longitude,
        latitude: task.latitude,
      },
    });
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async getTasks(): Promise<TaskDto[]> {
    return await this.prisma.task.findMany();
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
      },
    });
  }

  async getUsersTask(userId: number): Promise<object> {
    return await this.prisma.volunteerTask.findMany({
      where: {
        userId: userId,
      },
      select: {
        task: {
          select: {
            id: true,
            name: true,
            urgency: true,
            longitude: true,
            latitude: true,
          },
        },
      },
    });
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
}
