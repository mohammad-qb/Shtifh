import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { AgentPosition, Gender } from '@shtifh/helpers';

@InputType()
export class AdminUpdateAgentInput {
  @Field(() => [Int])
  @IsArray()
  @IsEnum(AgentPosition, { each: true })
  @IsNotEmpty()
  position!: AgentPosition[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  salary!: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  color!: string;

  @Field(() => String)
  @IsDateString()
  @IsNotEmpty()
  start_work_date!: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @Field(() => Int)
  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  agentId!: string;
}
