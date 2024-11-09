import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class PrismaCityGlobalScheduleJsonEntity {
  @Field(() => String)
  start_time!: string;

  @Field(() => String)
  end_time!: string;

  @Field(() => Number)
  requests_in_hour!: number;

  @Field(() => Boolean)
  is_off!: boolean;
}

@ObjectType()
class PrismaCityMonthlyScheduleJsonEntity {
  @Field(() => String)
  start_time!: string;

  @Field(() => String)
  end_time!: string;

  @Field(() => Number)
  year!: number;

  @Field(() => Number)
  month!: number;

  @Field(() => Number)
  requests_in_hour!: number;
}

@ObjectType()
class PrismaCityRecurringScheduleJsonEntity {
  @Field(() => String)
  start_time!: string;

  @Field(() => String)
  end_time!: string;

  @Field(() => String)
  date!: string;

  @Field(() => Number)
  requests_in_hour!: number;

  @Field(() => Boolean)
  is_off!: boolean;
}

@ObjectType()
class PrismaCityDailyScheduleJsonEntity {
  @Field(() => String)
  start_time!: string;

  @Field(() => String)
  end_time!: string;

  @Field(() => String)
  date!: string;

  @Field(() => Number)
  requests_in_hour!: number;

  @Field(() => Boolean)
  is_off!: boolean;
}

@ObjectType()
export class PrismaCityScheduleJsonEntity
  implements PrismaJson.CityScheduleJson
{
  @Field(() => PrismaCityGlobalScheduleJsonEntity)
  global!: PrismaCityGlobalScheduleJsonEntity;

  @Field(() => [PrismaCityMonthlyScheduleJsonEntity])
  monthly!: PrismaCityMonthlyScheduleJsonEntity[];

  @Field(() => [PrismaCityRecurringScheduleJsonEntity])
  recurring!: PrismaCityRecurringScheduleJsonEntity[];

  @Field(() => [PrismaCityDailyScheduleJsonEntity])
  daily!: PrismaCityDailyScheduleJsonEntity[];
}
