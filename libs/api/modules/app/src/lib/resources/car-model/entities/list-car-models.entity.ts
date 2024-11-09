import { ObjectType, OmitType } from '@nestjs/graphql';
import { CarModelEntity } from '@shtifh/entities';

@ObjectType()
export class ListCarModelsEntity extends OmitType(CarModelEntity, [
  'createdAt',
  'updatedAt',
]) {}
