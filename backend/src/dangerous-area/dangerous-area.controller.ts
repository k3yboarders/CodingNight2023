import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { DangerousAreaService } from './dangerous-area.service';
import { DangerousAreaDto } from './dto/dangerousArea.dto';

@Controller('dangerous-area')
export class DangerousAreaController {
    constructor(private readonly dangerousAreaService: DangerousAreaService) {}

    @Get()
    async getDangerousAreas(@Query('page') page = 1): Promise<object> {
        return await this.dangerousAreaService.getDangerousAreas(page);
    }

    @Post()
    async createDangerousArea(@Body() dangerousPlace: DangerousAreaDto): Promise<void> {
        await this.dangerousAreaService.createDangerousArea(dangerousPlace);
    }

    @Delete(':id')
    async deleteDangerousArea(@Query('id') id: number): Promise<void> {
        await this.dangerousAreaService.deleteDangerousArea(id);
    }

    @Post(':id')
    async updateDangerousArea(@Query('id') id: number, @Body() dangerousPlace: DangerousAreaDto): Promise<void> {
        await this.dangerousAreaService.updateDangerousArea(id, dangerousPlace);
    }
}
