import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: DbService) {}

  async getAllReports(page = 1) {
    const data = await this.prisma.report.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        text: true,
        longitude: true,
        latitude: true,
        type: true,
        isCompleted: true,
        ambulance: {
          select: {
            id: true,
            longitude: true,
            latitude: true,
            driver: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data,
      totalItems: await this.prisma.report.count(),
      totalPages: Math.ceil((await this.prisma.report.count()) / 10),
    };
  }
  
  async assignAmbulance(id: number, ambulanceId: number) {
    await this.prisma.ambulance.update({
      where: { id: ambulanceId },
      data: {
        isAvailable: false,
      },
    });
    await this.prisma.report.update({
      where: { id },
      data: {
        ambulanceId,
      },
    });
    return { message: 'OK' };
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

  async completeReport(id: number, userId: number) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      select: {
        isCompleted: true,
        ambulance: {
          select: {
            driverId: true,
          },
        },
      },
    });
    if (!report) {
      throw new HttpException('Report not found', 404);
    }
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (user.type !== 'ADMIN' && report.ambulance.driverId !== userId) {
      throw new HttpException(
        'You are not allowed to complete this report',
        403,
      );
    }
    return await this.prisma.report.update({
      where: { id },
      data: {
        isCompleted: !report.isCompleted,
      },
    });
  }

  async deleteReport(id: number) {
    return await this.prisma.report.delete({
      where: { id },
    });
  }


}