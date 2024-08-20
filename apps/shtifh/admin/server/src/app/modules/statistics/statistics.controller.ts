import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatisticsResourceService } from './statistics.service';
import { ListStatisticsDto } from './dto/list-statistics.dto';
import { ListStatisticsEntity } from './entities/list-statistics.entity';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsResourceController {
  private logger = new Logger(StatisticsResourceController.name);

  constructor(private readonly statisticsService: StatisticsResourceService) {}

  @Post()
  @ApiOperation({ summary: 'List All Statistics' })
  @ApiResponse({ type: ListStatisticsEntity })
  async list(@Body() body: ListStatisticsDto) {
    return await this.statisticsService.retrieve(body);
  }
}
