import { Field, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import {
  CityEntity,
  PrismaCityCarModelServiceEntity,
  ServiceEntity,
} from '@shtifh/entities';

@ObjectType()
class ListCitiesCarModelServiceEntity extends OmitType(
  PrismaCityCarModelServiceEntity,
  ['serviceId']
) {
  @Field(() => ServiceEntity)
  service!: ServiceEntity;
}
@ObjectType()
export class ListCitiesEntity extends PickType(CityEntity, ['id', 'name']) {
  @Field(() => [ListCitiesCarModelServiceEntity])
  car_model_services!: ListCitiesCarModelServiceEntity[];
}
