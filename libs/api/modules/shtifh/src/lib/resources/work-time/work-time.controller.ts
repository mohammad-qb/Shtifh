import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WorkTimeService } from './work-time.service';
import { ListAvailableSlotsDto } from './dto/list-available-slots.dto';

@ApiTags('Work Times')
@Controller('work-times')
export class WorkTimeController {
  private logger = new Logger(WorkTimeController.name);

  constructor(private readonly workTimeService: WorkTimeService) {}

  @Post('slots')
  @ApiOperation({ summary: 'List AvailableSlots' })
  async slots(@Body() body: ListAvailableSlotsDto) {
    return await this.workTimeService.slots(body);
  }
}
