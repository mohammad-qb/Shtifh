import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Service } from '@prisma/client';
import { CarServiceType } from '@shtifh/helpers';
import { PrismaNameJsonEntity } from './common/prisma-name-json.entity';


@ObjectType()
export class ServiceEntity implements Service {
  @Field(() => String)
  id!: string;

  @Field(() => PrismaNameJsonEntity)
  name!: PrismaNameJsonEntity;

  @Field(() => Int)
  type!: CarServiceType;

  @Field(() => String, { nullable: true })
  image_url!: string | null;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
