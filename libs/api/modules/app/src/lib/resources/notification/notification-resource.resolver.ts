import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { NotificationResourceService } from './notification-resource.service';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { MakeNotificationReadInput } from './inputs/make-notification-read.input';
import { UserPayload } from '@shtifh/user-service';
import { ListNotificationsEntity } from './entities/list-notifications.entity';
import { JwtAuthGuard } from '@shtifh/auth-service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class NotificationResourceResolver {
  private logger = new Logger(NotificationResourceResolver.name);

  constructor(
    private readonly notificationResourceService: NotificationResourceService
  ) {}

  @Query(() => [ListNotificationsEntity], { name: 'notifications' })
  async list(@GqlUser() user: UserPayload) {
    return await this.notificationResourceService.list(user.userId);
  }

  @Query(() => Boolean, { name: 'checkMissedNotifications' })
  async checkMissedNotifications(@GqlUser() user: UserPayload) {
    return await this.notificationResourceService.checkMissedNotifications(
      user.userId
    );
  }

  @Mutation(() => Boolean, { name: 'makeNotificationRead' })
  async makeNotificationRead(
    @Args('makeNotificationReadInput') input: MakeNotificationReadInput,
    @GqlLang() lang: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.notificationResourceService.makeNotificationRead(
      user.userId,
      input.notificationId,
      lang
    );
  }
}
