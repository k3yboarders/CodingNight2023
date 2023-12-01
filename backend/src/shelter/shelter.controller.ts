import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/adminGuard';
import { ShelterDto } from './dto/shelter.dto';
import { ShelterService } from './shelter.service';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Get()
  private async getShelters(@Query('page') page = 1) {
    return await this.shelterService.getShelters(page);
  }

  @Get(':id')
  private async getShelter(id: number) {
    return await this.shelterService.getShelter(id);
  }

  @Post()
  private async createShelter(dto: ShelterDto) {
    return await this.shelterService.createShelter(dto);
  }

  @Get(':id')
  private async getShelterById(id: number) {
    return await this.shelterService.getShelterById(id);
  }

  @Put(':id')
  private async updateShelter(id: number, dto: ShelterDto) {
    return await this.shelterService.updateShelter(id, dto);
  }

  @Delete(':id')
  private async deleteShelter(id: number) {
    return await this.shelterService.deleteShelter(id);
  }
}
