import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Customer } from '@prisma/client';
import { Gender } from '@shtifh/helpers';

@ObjectType()
export class CustomerEntity implements Customer {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  image_url!: string;

  @Field(() => Int)
  gender!: Gender;

  @Field(() => Boolean)
  is_removed!: boolean;

  @Field(() => String)
  userId!: string;
}
