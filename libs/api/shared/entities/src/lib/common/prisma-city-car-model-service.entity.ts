import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CityCarModelService } from '@prisma/client';

@ObjectType()
export class PrismaCityCarModelServiceEntity implements CityCarModelService {
  @Field(() => String)
  carModelId!: string;

  @Field(() => String)
  serviceId!: string;

  @Field(() => String)
  is_active!: boolean;

  @Field(() => Float)
  fees!: number;
}
