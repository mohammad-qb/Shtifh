import { ObjectType } from "@nestjs/graphql";
import { ExpressCatWashOrderEntity } from "@shtifh/entities";

@ObjectType()
export class ListCarWashOrdersEntity extends ExpressCatWashOrderEntity {}
