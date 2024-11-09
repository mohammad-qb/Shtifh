import { ObjectType, OmitType } from "@nestjs/graphql";
import { AccessoryEntity } from "@shtifh/entities";

@ObjectType()
export class ListAccessoriesEntity extends OmitType(AccessoryEntity, ['createdAt', 'updatedAt', 'is_active']) {}