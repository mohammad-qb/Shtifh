import { Injectable, Logger } from '@nestjs/common';
import { EnvService } from '@shtifh/env-service';
import axios from 'axios';
import {
  GetSignatureDTO,
  paymentQueryData,
  paymentURL
} from './entities/create-payment-intent.entity';

@Injectable()
export class HyPayResourceService {
  private logger = new Logger(HyPayResourceService.name);
  private HyBaseUrl;
  private HyKey;
  private HyMasOf;

  constructor(private readonly envService: EnvService) {
    this.HyBaseUrl = envService.get('HYPAYL_BASE_URL');
    this.HyKey = envService.get('HYPAY_API_KEY');
    this.HyMasOf = envService.get('HYPAYL_MASOF');
  }

  async paymentIntent(args: GetSignatureDTO): Promise<paymentURL> {
    const { amount, email, orderRefNumber, fullName, phone, lang, mode } = args;
    const [firstName, lastName] = fullName.split(' ');

    const paymentUrl = `${this.HyBaseUrl}?action=APISign&What=SIGN&KEY=${
      this.HyKey
    }&ClientName=${firstName || lastName}&ClientLName=${
      lastName || ''
    }&PassP=yaad.net&Masof=${this.HyMasOf}&mode=${
      mode || 'create'
    }&Order=${orderRefNumber}&Info=Shitfh App&Amount=${amount}&UTF8=True&UTF8out=True&UserId=00000000&cell=${phone}&email=${email}&Tash=1&FixTash=False&ShowEngTashText=False&Coin=1&Postpone=False&J5=False&Sign=True&MoreData=True&sendemail=True&SendHesh=True&PageLang=${
      lang === 'he' ? 'HEB' : 'ENG'
    }&tmp=5`;

    const { data } = await axios.get(paymentUrl);

    const params = new URLSearchParams(data);
    const jsonData: paymentQueryData = Object.fromEntries(params.entries());
    return {
      url: `${this.HyBaseUrl}?action=pay&${data}`,
      signature: jsonData.signature,
    };
  }
}
