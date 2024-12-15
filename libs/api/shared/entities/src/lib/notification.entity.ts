import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Notification } from '@prisma/client';

@ObjectType()
export class NotificationEntity implements Notification {
  @Field(() => String)
  id!: string;

  @Field(() => Int)
  type!: number;

  @Field(() => String)
  message!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => String, { nullable: true })
  userId!: string | null;
}
