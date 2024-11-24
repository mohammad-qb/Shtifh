import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class MakeNotificationReadInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  notificationId!: string;
}
