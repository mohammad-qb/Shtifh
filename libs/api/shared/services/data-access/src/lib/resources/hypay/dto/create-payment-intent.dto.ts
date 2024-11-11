import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentIntentDto {
  @IsString()
  @IsNotEmpty()
  order_reference!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsNumber()
  @IsNotEmpty()
  OrderTotalSum!: number;

  @IsEnum(['en', 'he', 'fr'])
  @IsOptional()
  lang?: string;
}
