import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsString()
  @IsNotEmpty()
  order_reference!: string;

  @IsNumber()
  @IsNotEmpty()
  OrderTotalSum!: number;
}
