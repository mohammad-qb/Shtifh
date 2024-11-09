import { ObjectType, OmitType } from '@nestjs/graphql';
import { CarBrandEntity } from '@shtifh/entities';

@ObjectType()
export class ListCarBrandsEntity extends OmitType(CarBrandEntity, [
  'createdAt',
  'updatedAt',
]) {}
