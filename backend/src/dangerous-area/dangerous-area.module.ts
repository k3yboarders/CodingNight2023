import { Module } from '@nestjs/common';
import { DangerousAreaService } from './dangerous-area.service';
import { DangerousAreaController } from './dangerous-area.controller';

@Module({
  providers: [DangerousAreaService],
  controllers: [DangerousAreaController]
})
export class DangerousAreaModule {}
