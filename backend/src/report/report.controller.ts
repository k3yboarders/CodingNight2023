import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/adminGuard';
import { ReportDto } from './dto/report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  async getAllReports(@Query('page') page = 1) {
    return await this.reportService.getAllReports(page);
  }

  @Post()
  async addReport(@Body() dto: ReportDto) {
    return await this.reportService.addReport(dto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get(':id')
  async getReportById(@Param('id') id: number) {
    return await this.reportService.getReportById(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  async updateReport(@Param('id') id: number, @Body() dto: ReportDto) {
    return await this.reportService.updateReport(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async deleteReport(@Param('id') id: number) {
    return await this.reportService.deleteReport(id);
  }
}
