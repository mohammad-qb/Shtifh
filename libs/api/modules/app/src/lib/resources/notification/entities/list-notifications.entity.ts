import { ObjectType } from '@nestjs/graphql';
import { NotificationEntity } from '@shtifh/entities';

@ObjectType()
export class ListNotificationsEntity extends NotificationEntity {}
