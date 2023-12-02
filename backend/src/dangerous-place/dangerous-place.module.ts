import { Module } from '@nestjs/common';
import { DangerousPlaceService } from './dangerous-place.service';
import { DangerousPlaceController } from './dangerous-place.controller';

@Module({
  providers: [DangerousPlaceService],
  controllers: [DangerousPlaceController]
})
export class DangerousPlaceModule {}
