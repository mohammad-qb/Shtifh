import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationResourceService } from './notification.service';
import { CreateNotificationDto } from './dto/create.dto';
import { CreateNotificationEntity } from './entity/create.entity';

@ApiTags('Notification')
@Controller('notifications')
export class NotificationResourceController {
  private logger = new Logger(NotificationResourceController.name);

  constructor(
    private readonly notificationService: NotificationResourceService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Notification' })
  @ApiResponse({ type: CreateNotificationEntity })
  async create(@Body() body: CreateNotificationDto) {
    return await this.notificationService.create(body);
  }
}
