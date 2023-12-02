import { Controller, Delete, Get, Post, Query, Body, Param, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { Ambulance } from '@prisma/client';
import { AmbulanceQueryResult, AmbulanceService } from './ambulance.service';
import { AmbulanceDto } from './dto/ambulance.dto';

@Controller('ambulance')
export class AmbulanceController {
    
    constructor(private readonly ambulanceService: AmbulanceService) {}

    @Get()
    async getAmbulances(@Query('page') page = 1): Promise<AmbulanceQueryResult> {
        return this.ambulanceService.getAmbulances(page);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createAmbulances(@Body() ambulanceData: AmbulanceDto): Promise<void> {
       await this.ambulanceService.createAmbulance(ambulanceData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAmbulance(@Param('id') ambulanceId: number): Promise<void> {
        await this.ambulanceService.deleteAmbulance(ambulanceId); 
    }

    @Post(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateAmbulance(@Param('id') ambulanceId: number, @Body() ambulanceData: AmbulanceDto): Promise<void> {
        await this.ambulanceService.updateAmbulance(ambulanceId, ambulanceData);
    }
}
