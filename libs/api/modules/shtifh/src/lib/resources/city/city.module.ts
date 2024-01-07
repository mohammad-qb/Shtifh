import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CityShtifhController } from './city.controller';
import { CityShtifhService } from './city.service';

@Module({
  imports: [PrismaModule],
  controllers: [CityShtifhController],
  providers: [CityShtifhService, CityShtifhController],
  exports: [CityShtifhService, CityShtifhController],
})
export class CityShtifhModule {}
