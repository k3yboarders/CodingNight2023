import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { DangerousPlaceService } from './dangerous-place.service';
import { DangerousPlaceDto } from './dto/dangerousPlace.dto';

@Controller('dangerous-place')
export class DangerousPlaceController {
    constructor(private readonly dangerousPlaceService: DangerousPlaceService) {}

    @Get()
    async getDangerousPlaces(@Query() page = 1): Promise<object> {
        return await this.dangerousPlaceService.getDangerousPlaces(page);
    }

    @Post()
    async createDangerousPlace(@Body() dangerousPlace: DangerousPlaceDto): Promise<void> {
        await this.dangerousPlaceService.createDangerousPlace(dangerousPlace);
    }

    @Delete(':id')
    async deleteDangerousPlace(@Query('id') id: number): Promise<void> {
        await this.dangerousPlaceService.deleteDangerousPlace(id);
    }

    @Post(':id')
    async updateDangerousPlace(@Query('id') id: number, @Body() dangerousPlace: DangerousPlaceDto): Promise<void> {
        await this.dangerousPlaceService.updateDangerousPlace(id, dangerousPlace);
    }
}
