import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';

@Module({
  providers: [ShelterService],
  controllers: [ShelterController],
})
export class ShelterModule {}
