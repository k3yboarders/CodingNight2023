import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/adminGuard';
import { ReportDto } from './dto/report.dto';
import { CompleteReportGuard } from 'src/auth/guards/completeReportGuard';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { DriverGuard } from 'src/auth/guards/driverGuard';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('last')
  async getByLastDays(
    @Query('days') days,
  ) {
    return await this.reportService.getReportsByLastDays(days);
  }


  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  async getAllReports(
    @Query('page') page = 1,
    @Query('isCompleted') isCompleted: boolean,
  ) {
    return await this.reportService.getAllReports(page, isCompleted);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addReport(@Body() dto: ReportDto) {
    return await this.reportService.addReport(dto);
  }

  @UseGuards(AuthGuard('jwt'), DriverGuard)
  @Get('user')
  async getUserReports(
    @GetUser() user: JwtAuthDto,
    @Query('isCompleted') isCompleted: boolean,
  ) {
    return await this.reportService.getUserReports(user.userId, isCompleted);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('assign')
  async assignReport(
    @Query('reportId') reportId: number,
    @Query('ambulanceId') ambulanceId: number,
  ) {
    return await this.reportService.assignAmbulance(reportId, ambulanceId);
  }
  @UseGuards(AuthGuard('jwt'), CompleteReportGuard)
  @Get('complete/:id')
  async getCompleteReportById(
    @Param('id') id: number,
    @GetUser() user: JwtAuthDto,
  ) {
    return await this.reportService.completeReport(id, user.userId);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async deleteReport(@Param('id') id: number) {
    return await this.reportService.deleteReport(id);
  }
}
