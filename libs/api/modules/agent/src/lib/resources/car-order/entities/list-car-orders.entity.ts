import { Field, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import {
  CarBrandEntity,
  CarEntity,
  CarModelEntity,
  CarOrderEntity,
  CityEntity,
  ServiceEntity,
  UserEntity,
} from '@shtifh/entities';

@ObjectType()
class AgentListCarOrdersCustomerUserEntity extends PickType(UserEntity, [
  'full_name',
]) {}

@ObjectType()
class AgentListCarOrdersCityEntity extends PickType(CityEntity, [
  'id',
  'name',
]) {}

@ObjectType()
class AgentListCarOrdersServiceEntity extends PickType(ServiceEntity, [
  'id',
  'name',
  'image_url',
  'type',
]) {}

@ObjectType()
class AgentListCarOrdersCarBrandEntity extends PickType(CarBrandEntity, [
  'id',
  'image_url',
  'name',
]) {}

@ObjectType()
class AgentListCarOrdersCarModelEntity extends PickType(CarModelEntity, [
  'id',
  'image_url',
  'name',
]) {}

@ObjectType()
class AgentListCarOrdersCarEntity extends PickType(CarEntity, [
  'id',
  'color',
  'plate_number',
  'year',
]) {
  @Field(() => AgentListCarOrdersCarBrandEntity)
  brand!: AgentListCarOrdersCarBrandEntity;

  @Field(() => AgentListCarOrdersCarModelEntity)
  model!: AgentListCarOrdersCarModelEntity;
}

@ObjectType()
export class AgentListCarOrdersEntity extends OmitType(CarOrderEntity, [
  'carId',
  'cityId',
  'customerId',
  'updatedAt',
  'serviceId',
]) {
  @Field(() => AgentListCarOrdersCustomerUserEntity)
  customer!: AgentListCarOrdersCustomerUserEntity;

  @Field(() => AgentListCarOrdersCityEntity)
  city!: AgentListCarOrdersCityEntity;

  @Field(() => AgentListCarOrdersServiceEntity)
  service!: AgentListCarOrdersServiceEntity;

  @Field(() => AgentListCarOrdersCarEntity)
  car!: AgentListCarOrdersCarEntity;
}
