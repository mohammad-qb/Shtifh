import { Field, Float, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

@InputType()
class CarOrderAccessoriesDto {
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
export class CreateNormalCarOrderDto {
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

  @Field(() => [CarOrderAccessoriesDto])
  @Type(() => CarOrderAccessoriesDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  accessories!: CarOrderAccessoriesDto[];

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;
}

@InputType()
export class CreatePrivateCarOrderDto {
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
