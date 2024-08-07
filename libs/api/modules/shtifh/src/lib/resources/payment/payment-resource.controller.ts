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
    @Query('orderId') orderId: string,
    @Query('transactionInternalNumber') transactionInternalNumber: string,
    @Query('order_reference') order_reference: string,
    @Query('uniqId') uniqId: string,
    @Query('statusCode') statusCode: string,
    @Query('token') token: string,
    @Query('Last4Digits') Last4Digits: string,
    @Query('TokenExpirationMonth') TokenExpirationMonth: string,
    @Query('TokenExpirationYear') TokenExpirationYear: string,
    @Query('ordernumber') ordernumber: string
  ) {
    return await this.paymentService.success({
      lang,
      Last4Digits,
      order_reference,
      orderId,
      ordernumber,
      statusCode,
      token,
      transactionInternalNumber,
      uniqId,
    });
  }

  @Get('/failed/:lang')
  async failedPayment(
    @Param('lang') lang: 'en' | 'he' | 'ar',
    @Query('orderId') orderId: string,
    @Query('transactionInternalNumber') transactionInternalNumber: string,
    @Query('order_reference') order_reference: string,
    @Query('uniqId') uniqId: string,
    @Query('statusCode') statusCode: string,
    @Query('token') token: string,
    @Query('Last4Digits') Last4Digits: string,
    @Query('TokenExpirationMonth') TokenExpirationMonth: string,
    @Query('TokenExpirationYear') TokenExpirationYear: string,
    @Query('ordernumber') ordernumber: string
  ) {
    return await this.paymentService.failed({
      lang,
      Last4Digits,
      order_reference,
      orderId,
      ordernumber,
      statusCode,
      token,
      transactionInternalNumber,
      uniqId,
    });
  }
}
