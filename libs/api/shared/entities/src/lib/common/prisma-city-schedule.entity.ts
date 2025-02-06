import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CitySchedule,
  CityScheduleDaily,
  CityScheduleGlobal,
  CityScheduleMonthly,
  CityScheduleRecurring,
  UnavailableSlots,
} from '@prisma/client';

@ObjectType()
export class PrismaCityUnavailableSlots implements UnavailableSlots {
  @Field(() => String)
  start_time!: string;

  @Field(() => String)
  end_time!: string;
}

@ObjectType()
class PrismaCityGlobalScheduleEntity implements CityScheduleGlobal {
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
class PrismaCityMonthlyScheduleEntity implements CityScheduleMonthly {
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
class PrismaCityRecurringScheduleEntity implements CityScheduleRecurring {
  @Field(() => String)
  start_time!: string;

  @Field(() => String)
  end_time!: string;

  @Field(() => Int)
  day!: number;

  @Field(() => Number)
  requests_in_hour!: number;

  @Field(() => Boolean)
  is_off!: boolean;

  @Field(() => [PrismaCityUnavailableSlots])
  unavailable_slots!: PrismaCityUnavailableSlots[];
}

@ObjectType()
class PrismaCityDailyScheduleEntity implements CityScheduleDaily {
  @Field(() => String)
  start_time!: string;

  @Field(() => String)
  end_time!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => Number)
  requests_in_hour!: number;

  @Field(() => Boolean)
  is_off!: boolean;

  @Field(() => [PrismaCityUnavailableSlots])
  unavailable_slots!: PrismaCityUnavailableSlots[];
}

@ObjectType()
export class PrismaCityScheduleEntity implements CitySchedule {
  @Field(() => PrismaCityGlobalScheduleEntity)
  global!: PrismaCityGlobalScheduleEntity;

  @Field(() => [PrismaCityMonthlyScheduleEntity])
  monthly!: PrismaCityMonthlyScheduleEntity[];

  @Field(() => [PrismaCityRecurringScheduleEntity])
  recurring!: PrismaCityRecurringScheduleEntity[];

  @Field(() => [PrismaCityDailyScheduleEntity])
  daily!: PrismaCityDailyScheduleEntity[];
}
