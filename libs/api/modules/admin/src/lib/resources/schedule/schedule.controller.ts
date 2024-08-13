import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScheduleResourceService } from './schedule.service';
import { RetrieveScheduleDto } from './dto/retrieve-schedule.dto';
import { UpdateMonthDto } from './dto/update-month.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { CreateUnavailableSlot } from './dto/create-unavailable-slot.dto';
import { updateTimeInOnceDto } from './dto/update-time.dto';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleResourceController {
  private logger = new Logger(ScheduleResourceController.name);

  constructor(
    private readonly scheduleResourceService: ScheduleResourceService
  ) {}

  @Post('/list')
  @ApiOperation({ summary: 'list schedule' })
  async schedule(@Body() body: RetrieveScheduleDto) {
    return await this.scheduleResourceService.schedule(body);
  }

  @Put('/month')
  @ApiOperation({ summary: 'Update Month schedule' })
  async updateMonth(@Body() body: UpdateMonthDto) {
    return await this.scheduleResourceService.updateMonth(body);
  }

  @Put('/day')
  @ApiOperation({ summary: 'Update Day schedule' })
  async updateDay(@Body() body: UpdateDayDto) {
    return await this.scheduleResourceService.updateDay(body);
  }

  @Post('/unavailable')
  @ApiOperation({ summary: 'Create new unavailable slot' })
  async createUnavailableSlot(@Body() body: CreateUnavailableSlot) {
    return await this.scheduleResourceService.createUnavailableSlot(body);
  }

  @Delete('/unavailable/:id')
  @ApiOperation({ summary: 'remove unavailable slot' })
  async removeUnavailableSlot(@Param('id') id: string) {
    return await this.scheduleResourceService.removeUnavailableSlot(id);
  }

  @Put('/time-in-one')
  @ApiOperation({ summary: 'Update time in once' })
  async updateInOnce(@Body() body: updateTimeInOnceDto) {
    return await this.scheduleResourceService.updateTimeInOnce(body);
  }
}
