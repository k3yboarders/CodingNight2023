import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/adminGuard';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query('page') page = 1) {
    return await this.usersService.getUsers(page);
  }

  @Get(':id')
  async getUser(@Query('id') id: number) {
    return await this.usersService.getUser(id);
  }

  @Put(':id')
  async updateUser(@Query('id') id: number, @Body() dto: UserDto) {
    await this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Query('id') id: number) {
    await this.usersService.deleteUser(id);
  }
}
