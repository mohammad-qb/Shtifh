import { Field, ObjectType } from '@nestjs/graphql';
import { City } from '@prisma/client';
import { PrismaNameEntity } from './common/prisma-name.entity';
import { PrismaCityScheduleEntity } from './common/prisma-city-schedule.entity';
import { PrismaCityCarModelServiceEntity } from './common/prisma-city-car-model-service.entity';

@ObjectType()
export class CityEntity implements City {
  @Field(() => String)
  id!: string;

  @Field(() => PrismaNameEntity)
  name!: PrismaNameEntity;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => PrismaCityScheduleEntity)
  schedule!: PrismaCityScheduleEntity;

  @Field(() => PrismaCityCarModelServiceEntity)
  car_model_services!: PrismaCityCarModelServiceEntity[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
