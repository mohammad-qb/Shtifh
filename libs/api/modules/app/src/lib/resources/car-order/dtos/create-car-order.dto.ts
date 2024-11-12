import { Field, Float, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

@InputType()
class CarOrderAccessoriesInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  accessoryId!: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;
}

@InputType()
export class CreateNormalCarOrderInput {
  @Field(() => String)
  @IsDateString()
  @IsNotEmpty()
  order_date!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  order_time!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  address!: string;

  @Field(() => Float, {nullable: true})
  @IsNumber()
  @IsOptional()
  tips!: number | null;

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

  @Field(() => [CarOrderAccessoriesInput])
  @Type(() => CarOrderAccessoriesInput)
  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  accessories!: CarOrderAccessoriesInput[];

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;
}

@InputType()
export class CreatePrivateCarOrderInput {
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
}
