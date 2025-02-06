import { Field, ObjectType } from '@nestjs/graphql';
import { CarModel } from '@prisma/client';
import { PrismaNameEntity } from './common/prisma-name.entity';

@ObjectType()
export class CarModelEntity implements CarModel {
  @Field(() => String)
  id!: string;

  @Field(() => PrismaNameEntity)
  name!: PrismaNameEntity;

  @Field(() => String)
  image_url!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
