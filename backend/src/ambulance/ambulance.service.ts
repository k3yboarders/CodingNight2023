import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { AmbulanceDto } from './dto/ambulance.dto';

export interface AmbulanceQueryResult {
  data: object;
  totalItems: number;
  totalPages: number;
}

@Injectable()
export class AmbulanceService {
  constructor(private readonly prisma: DbService) {}

  async getAmbulances(page: number): Promise<AmbulanceQueryResult> {
    const data = await this.prisma.ambulance.findMany({
      skip: (page - 1) * 10,
      take: 10,
      select: {
        id: true,
        longitude: true,
        latitude: true,
        isAvailable: true,
        driver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    return {
      data,
      totalItems: await this.prisma.ambulance.count(),
      totalPages: Math.ceil((await this.prisma.ambulance.count()) / 10),
    };
  }

  async createAmbulance(ambulanceData: AmbulanceDto): Promise<void> {
    await this.prisma.ambulance.create({
      data: {
        longitude: ambulanceData.longitude,
        latitude: ambulanceData.latitude,
        driverId: ambulanceData.driverId,
      },
    });
  }

  async deleteAmbulance(id: number): Promise<void> {
    await this.prisma.ambulance.delete({
      where: {
        id,
      },
    });
  }

  async updateAmbulance(
    id: number,
    ambulanceData: AmbulanceDto,
  ): Promise<void> {
    await this.prisma.ambulance.update({
      where: {
        id,
      },
      data: {
        longitude: ambulanceData.longitude,
        latitude: ambulanceData.latitude,
        driverId: ambulanceData.driverId,
      },
    });
  }

  async getAvailableAmbulances(): Promise<object> {
    return await this.prisma.ambulance.findMany({
      where: {
        isAvailable: true,
      },
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
    });
  }

  async getAllAmbulances(): Promise<object> {
    return await this.prisma.ambulance.findMany();
  }
}
