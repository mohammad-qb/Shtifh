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
import { HeaderLang, Lang } from '@shtifh/decorators';
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
  async list(@GetUser() user: Payload, @Lang() lang: HeaderLang) {
    return await this.notificationResourceService.list(user.id, lang);
  }

  @Get('missed')
  @ApiOperation({ summary: 'Check if customer has missed notification' })
  async checkMissedNotification(@GetUser() user: Payload) {
    return await this.notificationResourceService.checkMissedNotification(
      user.id
    );
  }
}
