import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PrismaCityCarModelServiceJsonEntity
  implements PrismaJson.CityCarModelServiceJson
{
  @Field(() => String)
  carModelId!: string;

  @Field(() => String)
  serviceId!: string;

  @Field(() => String)
  is_active!: boolean;

  @Field(() => Float)
  fees!: number;
}
