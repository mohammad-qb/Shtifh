import { Field, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { CarBrandEntity, CarEntity, CarModelEntity } from '@shtifh/entities';

@ObjectType()
class ListCarsBrandEntity extends OmitType(CarBrandEntity, [
  'createdAt',
  'updatedAt',
]) {}

@ObjectType()
class ListCarsModelEntity extends OmitType(CarModelEntity, [
  'createdAt',
  'updatedAt',
]) {}

@ObjectType()
export class ListCarsEntity extends PickType(CarEntity, [
  'color',
  'id',
  'is_active',
  'plate_number',
  'year',
]) {
  @Field(() => ListCarsBrandEntity)
  brand!: ListCarsBrandEntity;

  @Field(() => ListCarsModelEntity)
  model!: ListCarsModelEntity;
}
