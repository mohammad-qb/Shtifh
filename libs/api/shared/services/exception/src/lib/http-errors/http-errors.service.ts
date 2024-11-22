import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { httpErrorMessages } from '../constants/messages';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class HttpErrorsService {
  private logger = new Logger(HttpErrorsService.name);

  carNotFound(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Car with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__car_not_found[lang]);
  }

  emailAlreadyTaken(email: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Email ${email} already taken`);
    return new BadRequestException(
      httpErrorMessages.__email_already_taken[lang]
    );
  }

  userNotFound(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`User with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__user_not_found[lang]);
  }

  serviceNotFound(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__service_not_found[lang]);
  }

  cityNotFound(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`City with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__city_not_found[lang]);
  }

  serviceNotPublic(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${id} is not public`);
    return new BadRequestException(
      httpErrorMessages.__service_not_public[lang]
    );
  }

  serviceNotPrivate(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${id} is not private`);
    return new BadRequestException(
      httpErrorMessages.__service_not_private[lang]
    );
  }

  serviceNotAvailable(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${id} is not available`);
    return new BadRequestException(
      httpErrorMessages.__service_not_available[lang]
    );
  }

  invalidPassword(lang: HeaderLanguage = 'en') {
    this.logger.error(`Invalid password`);
    return new BadRequestException(httpErrorMessages.__invalid_password[lang]);
  }

  invalidLoginCredential(email: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Invalid login credential for email ${email}`);
    return new BadRequestException(
      httpErrorMessages.__invalid_login_credential[lang]
    );
  }

  carOrderNotFound(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Car order with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__car_order_not_found[lang]);
  }

  orderNotBelongToCustomer(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Order with id ${id} not belong to customer`);
    return new BadRequestException(httpErrorMessages.__order_not_belong_to_customer[lang]);
  }

  orderNotNormalType(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Order with id ${id} is not normal type`);
    return new BadRequestException(httpErrorMessages.__order_not_normal_type[lang]);
  }

  serviceNotAvailableForCity(serviceId: string, cityId: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${serviceId} is not available for city with id ${cityId}`);
    return new BadRequestException(httpErrorMessages.__service_not_available_for_city[lang]);
  }

  serviceNotAvailableForCarModel(serviceId: string, carModelId: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${serviceId} is not available for car model with id ${carModelId}`);
    return new BadRequestException(httpErrorMessages.__service_not_available_for_car_model[lang]);
  }

  carWashOrderNotFound(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Car wash order with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__car_wash_order_not_found[lang]);
  }

  carWashOrderAlreadyCancelled(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Car wash order with id ${id} already cancelled`);
    return new BadRequestException(httpErrorMessages.__car_wash_order_already_cancelled[lang]);
  }

  carOrderNotBelongToAgent(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Car order with id ${id} not belong to agent`);
    return new BadRequestException(httpErrorMessages.__car_order_not_belong_to_agent[lang]);
  }

  carOrderAlreadyCancelled(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Car order with id ${id} already cancelled`);
    return new BadRequestException(httpErrorMessages.__car_order_already_cancelled[lang]);
  }
}
