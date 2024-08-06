import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaymentResourceService } from './payment-resource.service';
import { IpnOrderDetails } from './types/payment.type';

@Controller('payments')
export class PaymentResourceController {
  private logger = new Logger(PaymentResourceController.name);

  constructor(private readonly paymentService: PaymentResourceService) {}

  @Post('listener')
  async ipn(@Body() body: IpnOrderDetails) {
    return await this.paymentService.ipn(body);
  }

  @Get('/success/:lang')
  async successPayment(
    @Param('lang') lang: 'en' | 'he' | 'ar',
    @Query('orderId') orderId: string
  ) {
    return await this.paymentService.success(orderId, lang);
  }

  @Get('/failed/:lang')
  async failedPayment(
    @Param('lang') lang: 'en' | 'he' | 'ar',
    @Query('orderId') orderId: string
  ) {
    return await this.paymentService.failed(orderId, lang);
  }
}
