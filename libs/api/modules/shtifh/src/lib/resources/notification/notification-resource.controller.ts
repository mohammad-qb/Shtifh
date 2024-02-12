import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { NotificationResourceService } from './notification-resource.service';
import { Payload } from '@shtifh/user-service';
import { ListNotificationsEntity } from './entities/list-notifications.entity';
@ApiTags('Notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('notifications')
export class NotificationResourceController {
  private logger = new Logger(NotificationResourceController.name);

  constructor(
    private readonly notificationResourceService: NotificationResourceService
  ) {}

  @Get()
  @ApiOperation({ summary: 'List notifications' })
  @ApiResponse({ type: ListNotificationsEntity })
  async list(@GetUser() user: Payload) {
    return await this.notificationResourceService.list(user.id);
  }
}
