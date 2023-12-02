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
import { DangerousAreaService } from './dangerous-area.service';
import { DangerousAreaDto } from './dto/dangerousArea.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/adminGuard';

@Controller('dangerous-area')
export class DangerousAreaController {
  constructor(private readonly dangerousAreaService: DangerousAreaService) {}

  @Get()
  async getDangerousAreas(@Query('page') page = 1): Promise<object> {
    return await this.dangerousAreaService.getDangerousAreas(page);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  async createDangerousArea(
    @Body() dangerousPlace: DangerousAreaDto,
  ): Promise<void> {
    await this.dangerousAreaService.createDangerousArea(dangerousPlace);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async deleteDangerousArea(@Query('id') id: number): Promise<void> {
    await this.dangerousAreaService.deleteDangerousArea(id);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  async updateDangerousArea(
    @Query('id') id: number,
    @Body() dangerousPlace: DangerousAreaDto,
  ): Promise<void> {
    await this.dangerousAreaService.updateDangerousArea(id, dangerousPlace);
  }
}
