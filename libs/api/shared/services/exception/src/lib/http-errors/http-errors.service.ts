import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { httpErrorMessages } from "../constants/messages";
import { HeaderLanguage } from "@shtifh/decorators";

@Injectable()
export class HttpErrorsService {
  private logger = new Logger(HttpErrorsService.name);

  carNotFound(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Car with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__car_not_found[lang]);
  }

  emailAlreadyTaken(email: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Email ${email} already taken`);
    return new BadRequestException(httpErrorMessages.__email_already_taken[lang]);
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
    return new BadRequestException(httpErrorMessages.__service_not_public[lang]);
  }

    serviceNotPrivate(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${id} is not private`);
    return new BadRequestException(httpErrorMessages.__service_not_private[lang]);
  }

  serviceNotAvailable(id: string, lang: HeaderLanguage = 'en') {
    this.logger.error(`Service with id ${id} is not available`);
    return new BadRequestException(httpErrorMessages.__service_not_available[lang]);
  }
}
