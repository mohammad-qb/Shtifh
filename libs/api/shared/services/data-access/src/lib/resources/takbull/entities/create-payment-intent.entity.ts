export class CreatePaymentIntentEntity {
  responseCode!: number;
  uniqId!: string;
  url!: string;
}

export class GetSigntureDTO {
  order!: string;
  amount!: number;
  fullname!: string;
  email!: string;
  phone!: string;
}

export interface paymentQueryData {
  Amount?: string;
  ClientLName?: string;
  ClientName?: string;
  Coin?: string;
  FixTash?: string;
  Info?: string;
  J5?: string;
  Masof?: string;
  MoreData?: string;
  Order?: string;
  PageLang?: string;
  Postpone?: string;
  Pritim?: string;
  SendHesh?: string;
  ShowEngTashText?: string;
  Sign?: string;
  Tash?: string;
  UTF8?: string;
  UTF8out?: string;
  UserId?: string;
  action?: string;
  cell?: string;
  city?: string;
  email?: string;
  heshDesc?: string;
  phone?: string;
  sendemail?: string;
  street?: string;
  tmp?: string;
  zip?: string;
  signature?: string;
}

export interface paymentURL {
  url?: string;
  signture?: string;
  order?: string;
}
