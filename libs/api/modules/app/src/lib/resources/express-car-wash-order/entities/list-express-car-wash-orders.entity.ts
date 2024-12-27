import { ObjectType } from "@nestjs/graphql";
import { ExpressCatWashOrderEntity } from "@shtifh/entities";

@ObjectType()
export class ListExpressCarWashOrdersEntity extends ExpressCatWashOrderEntity {}
