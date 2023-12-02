import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: DbService) {}

  async getAllReports(page = 1) {
    return await this.prisma.report.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  async getReportById(id: number) {
    return await this.prisma.report.findUnique({
      where: { id },
    });
  }

  async addReport(dto: ReportDto) {
    return await this.prisma.report.create({
      data: {
        text: dto.text,
        longitude: dto.longitude,
        latitude: dto.latitude,
        type: dto.type,
      },
    });
  }

  async updateReport(id: number, dto: ReportDto) {
    return await this.prisma.report.update({
      where: { id },
      data: {
        text: dto.text,
        longitude: dto.longitude,
        latitude: dto.latitude,
        type: dto.type,
      },
    });
  }

  async deleteReport(id: number) {
    return await this.prisma.report.delete({
      where: { id },
    });
  }
}
