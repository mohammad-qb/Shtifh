import { Field, ObjectType } from '@nestjs/graphql';
import { CarBrand } from '@prisma/client';
import { PrismaNameEntity } from './common/prisma-name.entity';

@ObjectType()
export class CarBrandEntity implements CarBrand {
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
