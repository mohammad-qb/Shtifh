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

  constructor(private readonly envService: EnvService) {
    this.baseUrl = envService.get('TAKBULL_BASE_URL');
    this.apiKey = envService.get('TAKBULL_API_KEY');
    this.secretKey = envService.get('TAKBULL_API_SECRET');
  }

  async paymentIntent(
    args: CreatePaymentIntentDto
  ): Promise<CreatePaymentIntentEntity> {
    return await axios.post(
      `${this.baseUrl}/GetTakbullPaymentPageRedirectUrl`,
      {
        headers: {
          API_Secret: this.secretKey,
          API_Key: this.apiKey,
        },
        body: args,
      }
    );
  }
}
