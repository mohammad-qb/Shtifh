import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsMongoId, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateCarInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  plate_number!: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  year!: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  color!: string;

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carBrandId!: string;

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carModelId!: string;
}