import { Field, Int } from '@nestjs/graphql';
import { Car } from '@prisma/client';

export class CarEntity implements Car {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  plate_number!: string;

  @Field(() => Int)
  year!: number;

  @Field(() => String)
  color!: string;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => String)
  customerId!: string;

  @Field(() => String)
  carBrandId!: string;

  @Field(() => String)
  carModelId!: string;
}
