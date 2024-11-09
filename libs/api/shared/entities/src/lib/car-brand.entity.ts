import { Field, ObjectType } from '@nestjs/graphql';
import { CarBrand } from '@prisma/client';
import { PrismaNameJsonEntity } from './common/prisma-name-json.entity';

@ObjectType()
export class CarBrandEntity implements CarBrand {
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
