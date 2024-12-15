import { Field, ObjectType } from '@nestjs/graphql';
import {
  CarBrandEntity,
  CarEntity,
  CarModelEntity,
  CustomerEntity,
  UserEntity,
} from '@shtifh/entities';

@ObjectType()
class AdminListCarsCustomerEntity extends CustomerEntity {
  @Field(() => UserEntity)
  user!: UserEntity;
}

@ObjectType()
export class AdminListCarsEntity extends CarEntity {
  @Field(() => CarModelEntity)
  brand!: CarBrandEntity;

  @Field(() => CarModelEntity)
  model!: CarModelEntity;

  @Field(() => AdminListCarsCustomerEntity)
  customer!: AdminListCarsCustomerEntity;
}
