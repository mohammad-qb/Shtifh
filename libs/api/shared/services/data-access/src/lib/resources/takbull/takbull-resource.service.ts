import { Injectable, Logger } from '@nestjs/common';
import { EnvService } from '@shtifh/env-service';
import axios from 'axios';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import {
  CreatePaymentIntentEntity,
  GetSigntureDTO,
  paymentQueryData,
  paymentURL,
} from './entities/create-payment-intent.entity';

@Injectable()
export class TakbullResourceService {
  private logger = new Logger(TakbullResourceService.name);
  private baseUrl;
  private apiKey;
  private secretKey;
  private HybaseUrl;
  private HyKey;
  private HyMasof;
  private HyPassp;
  private serverUrl;

  constructor(private readonly envService: EnvService) {
    this.baseUrl = envService.get('TAKBULL_BASE_URL');
    this.secretKey = envService.get('TAKBULL_API_SECRET');
    this.apiKey = envService.get('TAKBULL_API_KEY');

    this.HybaseUrl = envService.get('HYPAYL_BASE_URL');
    this.HyKey = envService.get('HYPAY_API_KEY');
    this.HyMasof = envService.get('HYPAYL_MASOF');
    this.HyPassp = envService.get('HYPAYL_PASSP');
    this.serverUrl = envService.get('SERVER_URL');
  }

  async paymentIntent(
    args: CreatePaymentIntentDto
  ): Promise<CreatePaymentIntentEntity> {
    axios.defaults.headers['API_Key'] = this.apiKey;
    axios.defaults.headers['API_Secret'] = this.secretKey;

    const result = await axios.post(
      `${this.baseUrl}/GetTakbullPaymentPageRedirectUrl`,
      {
        order_reference: args.order_reference,
        Email: args.email,
        PhoneNumber: args.phone,
        Currency: 'ILS',
        OrderTotalSum: args.OrderTotalSum,
        Language: args.lang === 'ar' ? 'en' : args.lang || 'en',
        CreateDocument: true,
        IPNAddress: `${this.serverUrl}/api/payments/listener`,
        RedirectAddress: `${this.serverUrl}/api/payments/success/${
          args.lang || 'en'
        }?orderId=${args.order_reference}`,
        CancelReturnAddress: `${this.serverUrl}/api/payments/failed/${
          args.lang || 'en'
        }?orderId=${args.order_reference}`,
      }
    );

    console.log({ result });

    return result.data;
  }

  async PaymentHY(args: GetSigntureDTO): Promise<paymentURL> {
    const { amount, email, order, fullname, phone } = args;
    const [firstname, lastname] = fullname.split(' ');

    const paymenturl = `${this.HybaseUrl}?action=APISign&What=SIGN&KEY=7110eda4d09e062aa5e4a390b0a572ac0d2c0220&ClientName=${firstname}&ClientLName=${lastname}&PassP=yaad&Masof=0010131918&Order=${order}&Info=test-api&Amount=${amount}&UTF8=True&UTF8out=True&UserId=00000000&cell=${phone}&email=${email}&Tash=1&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&SendHesh=True&PageLang=ENG&tmp=9`;
    // const paymenturl = `${this.HybaseUrl}?action=APISign&What=SIGN&KEY=${this.HyKey}&ClientName=${firstname}&ClientLName=${lastname}&PassP=${this.HyPassp}&Masof=${this.HyMasof}&Order=${order}&Info=test-api&Amount=${amount}&UTF8=True&UTF8out=True&UserId=00000000&cell=${phone}&email=${email}&Tash=1&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&SendHesh=True&PageLang=ENG&tmp=9`;

    const { data } = await axios.get(paymenturl);

    const params = new URLSearchParams(data);
    const jsonData: paymentQueryData = Object.fromEntries(params.entries());
    return {
      url: `${this.HybaseUrl}?action=pay&${data}`,
      signture: jsonData.signature,
      order: jsonData.Order,
    };
  }
}
