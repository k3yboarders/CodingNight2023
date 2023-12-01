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
import { VolunteerGuard } from 'src/auth/guards/volunteerGuard';
import { CompleteTaskGuard } from 'src/auth/guards/completeTaskGuard';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  async createTask(@Body() task: TaskDto): Promise<void> {
    await this.taskService.createTask(task);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  async getAllTasks(@Query('search') search?: string): Promise<object> {
    return await this.taskService.getTasks();
  }
  @UseGuards(AuthGuard('jwt'), VolunteerGuard)
  @Get(':id')
  async getUsersTasks(@Param('id') userId: number): Promise<object> {
    return await this.taskService.getUsersTask(userId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async deleteTask(@Param('id') taskId: number): Promise<void> {
    await this.taskService.deleteTask(taskId);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch(':id')
  async updateTask(
    @Param('id') taskId: number,
    @Body() task: TaskDto,
  ): Promise<void> {
    await this.taskService.updateTask(taskId, task);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('assign')
  @HttpCode(HttpStatus.OK)
  async assignTask(@Body() assignment: AssignTaskDto): Promise<void> {
    await this.taskService.assignTaskToVolunteer(
      assignment.taskId,
      assignment.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'), CompleteTaskGuard)
  @Get('complete/:id')
  async completeTask(
    @Param('id') taskId: number,
    @GetUser() user: JwtAuthDto,
  ): Promise<void> {
    await this.taskService.completeTask(taskId, user.userId);
  }
}
