import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateNormalCarOrderInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  address!: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  note!: string | null;

  @Field(() => [String])
  @IsString({each: true})
  @IsArray()
  @IsNotEmpty()
  car_location!: string[];

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  serviceId!: string;

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;


  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carOrderId!: string;
}
