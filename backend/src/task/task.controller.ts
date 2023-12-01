import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/adminGuard';
import { TaskDto } from './dto/task.dto';
import { AssignTaskDto } from './dto/assignTask.dto';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: TaskDto): Promise<void> {
    await this.taskService.createTask(task);
  }

  @Get()
  async getAllTasks(@Query('search') search?: string): Promise<object> {
    return await this.taskService.getTasks();
  }

  @Get(':id')
  async getUsersTasks(@Param('id') userId: number): Promise<object> {
    return await this.taskService.getUsersTask(userId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: number): Promise<void> {
    await this.taskService.deleteTask(taskId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: number,
    @Body() task: TaskDto,
  ): Promise<void> {
    await this.taskService.updateTask(taskId, task);
  }

  @Post('assign')
  @HttpCode(HttpStatus.OK)
  async assignTask(@Body() assignment: AssignTaskDto): Promise<void> {
    await this.taskService.assignTaskToVolunteer(
      assignment.taskId,
      assignment.userId,
    );
  }
}
