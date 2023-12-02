import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DangerousPlaceService } from './dangerous-place.service';
import { DangerousPlaceDto } from './dto/dangerousPlace.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/adminGuard';

@Controller('dangerous-place')
export class DangerousPlaceController {
  constructor(private readonly dangerousPlaceService: DangerousPlaceService) {}

  @Get()
  async getDangerousPlaces(@Query('page') page = 1): Promise<object> {
    return await this.dangerousPlaceService.getDangerousPlaces(page);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  async createDangerousPlace(
    @Body() dangerousPlace: DangerousPlaceDto,
  ): Promise<void> {
    await this.dangerousPlaceService.createDangerousPlace(dangerousPlace);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async deleteDangerousPlace(@Query('id') id: number): Promise<void> {
    await this.dangerousPlaceService.deleteDangerousPlace(id);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  async updateDangerousPlace(
    @Query('id') id: number,
    @Body() dangerousPlace: DangerousPlaceDto,
  ): Promise<void> {
    await this.dangerousPlaceService.updateDangerousPlace(id, dangerousPlace);
  }
}
