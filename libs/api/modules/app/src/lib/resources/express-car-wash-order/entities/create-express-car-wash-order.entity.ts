import { ObjectType, PickType } from '@nestjs/graphql';
import { ExpressCatWashOrderEntity } from '@shtifh/entities';

@ObjectType()
export class CreateExpressCarWashOrderEntity extends PickType(
  ExpressCatWashOrderEntity,
  ['id']
) {}
