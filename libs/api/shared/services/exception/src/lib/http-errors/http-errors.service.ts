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
}