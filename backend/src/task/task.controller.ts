import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/adminGuard';
import { TaskDto } from './dto/task.dto';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(@Body() task: TaskDto): Promise<void> {
        await this.taskService.createTask(task);
    }

    @Get()
    async getAllTasks(): Promise<object> {
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
    async updateTask(@Param('id') taskId: number, @Body() task: TaskDto): Promise<void> {
        await this.taskService.updateTask(taskId, task);
    }
}
