import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class ListCityAvailableSlotsInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @Field(() => String)
  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
