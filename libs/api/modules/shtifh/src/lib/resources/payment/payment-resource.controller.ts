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
    @Query('ln') orderId: string
  ) {
    if (lang === 'ar') return 'تم الدفع بنجاح';
    else if (lang === 'he') return 'תשלום בוצע בהצלחה';
    else return 'payment successfully';
  }

  @Get('/failed/:lang')
  async failedPayment(
    @Param('lang') lang: 'en' | 'he' | 'ar',
    @Query('ln') orderId: string
  ) {
    if (lang === 'ar') return 'لم تتم عملية الدفع';
    else if (lang === 'he') return 'התשלום נכשל';
    else return 'payment failed';
  }
}
