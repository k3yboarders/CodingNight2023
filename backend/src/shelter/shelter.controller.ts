import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/adminGuard';
import { ShelterDto } from './dto/shelter.dto';
import { ShelterService } from './shelter.service';

@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  private async getShelters() {
    return await this.shelterService.getShelters();
  }

  @Get('public')
  private async getSheltersPublic() {
    return await this.shelterService.getSheltersPublic();
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get(':id')
  private async getShelter(id: number) {
    return await this.shelterService.getShelter(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  private async createShelter(dto: ShelterDto) {
    return await this.shelterService.createShelter(dto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get(':id')
  private async getShelterById(id: number) {
    return await this.shelterService.getShelterById(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  private async updateShelter(id: number, dto: ShelterDto) {
    return await this.shelterService.updateShelter(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  private async deleteShelter(id: number) {
    return await this.shelterService.deleteShelter(id);
  }
}
