import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Accessory } from '@prisma/client';
import { PrismaNameEntity } from './common/prisma-name.entity';

@ObjectType()
export class AccessoryEntity implements Accessory {
  @Field(() => String)
  id!: string;

  @Field(() => PrismaNameEntity)
  name!: PrismaNameEntity;

  @Field(() => String)
  image_url!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
