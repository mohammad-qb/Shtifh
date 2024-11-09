import { ObjectType, PickType } from "@nestjs/graphql";
import { CityEntity } from "@shtifh/entities";

@ObjectType()
export class ListCitiesEntity extends PickType(CityEntity, ['id', 'name', 'car_model_services']) {}