import { Injectable, Logger } from '@nestjs/common';
import { EnvService } from '@shtifh/env-service';
import axios from 'axios';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CreatePaymentIntentEntity } from './entities/create-payment-intent.entity';

@Injectable()
export class TakbullResourceService {
  private logger = new Logger(TakbullResourceService.name);
  private baseUrl;
  private apiKey;
  private secretKey;
  private serverUrl;

  constructor(private readonly envService: EnvService) {
    this.baseUrl = envService.get('TAKBULL_BASE_URL');
    this.apiKey = envService.get('TAKBULL_API_KEY');
    this.secretKey = envService.get('TAKBULL_API_SECRET');
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
}
