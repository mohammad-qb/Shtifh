import { Field } from '@nestjs/graphql';
import { CarModel } from '@prisma/client';
import { PrismaNameJsonEntity } from './common/prisma-name-json.entity';

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
