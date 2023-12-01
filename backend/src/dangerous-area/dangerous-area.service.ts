import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { DangerousAreaDto } from './dto/dangerousArea.dto';

@Injectable()
export class DangerousAreaService {
    
    constructor(private readonly prisma: DbService) {}

    async createDangerousArea(dangerousArea: DangerousAreaDto): Promise<void> {
        await this.prisma.dangerousArea.create({
            data: {
                latitude: dangerousArea.latitude,
                longitude: dangerousArea.longitude,
                type: dangerousArea.dangerType,
                severity: dangerousArea.severity,
                radius: dangerousArea.radius,
            }
        })
    }

    async deleteDangerousArea(id: number): Promise<void> {
        await this.prisma.dangerousArea.delete({
            where: {
                id
            }
        });
    }

    async updateDangerousArea(id: number, dangerousArea: DangerousAreaDto): Promise<void> {
        await this.prisma.dangerousArea.update({
            where: {
                id
            },
            data: {
                latitude: dangerousArea.latitude,
                longitude: dangerousArea.longitude,
                type: dangerousArea.dangerType,
                severity: dangerousArea.severity,
                radius: dangerousArea.radius,
            }
        });
    }

    async getDangerousAreas(page: number): Promise<object> {
       const data = await this.prisma.dangerousArea.findMany({
           skip: page * 10,
           take: 10
       });
       
       const count = await this.prisma.dangerousArea.count();
       return {
        data,
        totalItems: count,
        totalPages: Math.ceil(count / 10),
       };
    }
        
}
