import { Controller, Get, Logger, Param, Query, Render } from '@nestjs/common';
import { PaymentResourceService } from './payment-resource.service';

@Controller('payments')
export class PaymentResourceController {
  private logger = new Logger(PaymentResourceController.name);

  constructor(private readonly paymentService: PaymentResourceService) {}

  @Render('success-page')
  @Get('/success/:lang')
  async successPayment(
    @Param('lang') lang: 'en' | 'he' | 'ar',

    @Query('CCode') CCode: string,
    @Query('UID') uniqId: string,
    @Query('L4digit') Last4Digits: string,
    @Query('Order') ordernumber: string
    // @Query('Sign') sign: string,
    // @Query('Amount') Amount: string,
    // @Query('ACode') ACode: string,
    // @Query('Fild1') fullname: string,
    // @Query('Fild2') email: string,
    // @Query('UserId') UserId: string,

    // @Query('Tmonth') TokenExpirationMonth: string,
    // @Query('Tyear') TokenExpirationYear: string,
  ) {
    return await this.paymentService.success({
      lang,
      Last4Digits,
      ordernumber,
      statusCode: CCode,
      uniqId, ////
    });
  }

  @Render('failed-page')
  @Get('/failed/:lang')
  async failedPayment(
    @Param('lang') lang: 'en' | 'he' | 'ar',

    @Query('CCode') CCode: string,
    @Query('UID') uniqId: string,
    @Query('L4digit') Last4Digits: string,
    @Query('Order') ordernumber: string
    // @Query('Sign') sign: string,
    // @Query('Amount') Amount: string,
    // @Query('ACode') ACode: string,
    // @Query('Fild1') fullname: string,
    // @Query('Fild2') email: string,
    // @Query('UserId') UserId: string,

    // @Query('Tmonth') TokenExpirationMonth: string,
    // @Query('Tyear') TokenExpirationYear: string,
  ) {
    return await this.paymentService.failed({
      lang,
      Last4Digits,
      ordernumber,
      statusCode: CCode,
      uniqId,
    });
  }
}
