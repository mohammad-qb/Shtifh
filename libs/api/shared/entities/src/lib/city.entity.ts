import { Field } from '@nestjs/graphql';
import { City } from '@prisma/client';
import { PrismaNameJsonEntity } from './common/prisma-name-json.entity';
import { PrismaCityScheduleJsonEntity } from './common/prisma-city-schedule-json.entity';
import { PrismaCityCarModelServiceJsonEntity } from './common/prisma-city-car-model-service-json.entity';

export class CityEntity implements City {
  @Field(() => String)
  id!: string;

  @Field(() => PrismaNameJsonEntity)
  name!: PrismaNameJsonEntity;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => PrismaCityScheduleJsonEntity)
  schedule!: PrismaCityScheduleJsonEntity;

  @Field(() => PrismaCityCarModelServiceJsonEntity)
  car_model_services!: PrismaCityCarModelServiceJsonEntity[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
