import { Field, ObjectType } from '@nestjs/graphql';
import { CarModel } from '@prisma/client';
import { PrismaNameJsonEntity } from './common/prisma-name-json.entity';

@ObjectType()
export class CarModelEntity implements CarModel {
  @Field(() => String)
  id!: string;

  @Field(() => PrismaNameJsonEntity)
  name!: PrismaNameJsonEntity;

  @Field(() => String)
  image_url!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
