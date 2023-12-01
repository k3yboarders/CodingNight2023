import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { DangerousPlaceDto } from './dto/dangerousPlace.dto';

@Injectable()
export class DangerousPlaceService {
    
    constructor(private readonly prisma: DbService) {}

    async createDangerousPlace(dangerousPlace: DangerousPlaceDto): Promise<void> {
        await this.prisma.dangerousPlace.create({
            data: {
                latitude: dangerousPlace.latitude,
                longitude: dangerousPlace.longitude,
                type: dangerousPlace.dangerType,
                severity: dangerousPlace.severity
            }
        })
    }

    async deleteDangerousPlace(id: number): Promise<void> {
        await this.prisma.dangerousPlace.delete({
            where: {
                id
            }
        });
    }

    async updateDangerousPlace(id: number, dangerousPlace: DangerousPlaceDto): Promise<void> {
        await this.prisma.dangerousPlace.update({
            where: {
                id
            },
            data: {
                latitude: dangerousPlace.latitude,
                longitude: dangerousPlace.longitude,
                type: dangerousPlace.dangerType,
                severity: dangerousPlace.severity
            }
        });
    }

    async getDangerousPlaces(page: number): Promise<object> {
       const data = await this.prisma.dangerousPlace.findMany({
           skip: page * 10,
           take: 10
       });
       
       const count = await this.prisma.dangerousPlace.count();
       return {
        data,
        totalItems: count,
        totalPages: Math.ceil(count / 10),
       };
    }
        
}
