import { Field, ObjectType, PickType } from '@nestjs/graphql';
import {
  CarBrandEntity,
  CarEntity,
  CarModelEntity,
  CarOrderEntity,
  ServiceEntity,
  UserEntity,
} from '@shtifh/entities';

@ObjectType()
export class CarDataForListCarOrdersEntity extends PickType(CarEntity, [
  'id',
  'color',
  'plate_number',
  'year',

]) {
  @Field(() => CarModelEntity)
  model!: CarModelEntity;

  @Field(() => CarBrandEntity)
  brand!: CarBrandEntity;
}

@ObjectType()
export class ServiceDataForListCarOrdersEntity extends PickType(ServiceEntity, [
  'id',
  'image_url',
  'name',
  'type',
]) {}

@ObjectType()
export class AgentDataForListCarOrdersEntity extends PickType(
  UserEntity,
  ['full_name']
) {}

@ObjectType()
export class ListCarOrdersEntity extends PickType(CarOrderEntity, [
  'accessories',
  'address',
  'fees',
  'note',
  'order_date',
  'order_time',
  'ref_number',
  'type',
  'logs'
]) {
  @Field(() => CarDataForListCarOrdersEntity)
  car!: CarDataForListCarOrdersEntity;

  @Field(() => ServiceDataForListCarOrdersEntity)
  service!: ServiceDataForListCarOrdersEntity;

  @Field(() => AgentDataForListCarOrdersEntity, { nullable: true })
  agent!: AgentDataForListCarOrdersEntity | null;
}
