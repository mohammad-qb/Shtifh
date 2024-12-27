import { Field, Float, InputType } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateExpressCarWashOrderInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;

  @Field(() => [Float])
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  coordinates!: [number, number];
}
