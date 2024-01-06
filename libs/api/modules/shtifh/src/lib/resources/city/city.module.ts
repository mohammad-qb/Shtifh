import { Module } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CityShtifhService } from './city.service';
import { CityShtifhController } from './city.controller';

@Module({
  imports: [PrismaService],
  providers: [CityShtifhService],
  exports: [CityShtifhService, CityShtifhController],
})
export class CityShtifhModule {}
