import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationResourceService } from './notification.service';
import { CreateNotificationDto, CreateSpecificNotificationDto } from './dto/create.dto';
import { CreateNotificationEntity } from './entity/create.entity';
import { GetUser } from '@shtifh/auth-service';
import { Payload } from '@shtifh/user-service';

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

  @Post('specific')
  @ApiOperation({ summary: 'Create Specific Notification' })
  @ApiResponse({ type: CreateNotificationEntity })
  async createSpecificNotification(@Body() body: CreateSpecificNotificationDto) {
    return await this.notificationService.createSpecificNotification(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all Notifications' })
  async list() {
    return await this.notificationService.list();
  }
}
