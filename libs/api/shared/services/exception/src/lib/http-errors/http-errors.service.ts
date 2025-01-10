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

  /**
   * Handles the case where a car with a specific ID is not found.
   * Logs an error message and returns a NotFoundException with the appropriate error message.
   *
   * @param {string} id - The unique identifier of the car that could not be found.
   * @param {HeaderLanguage} [lang='en'] - The language in which the error message should be returned.
   * @return {NotFoundException} An exception indicating that the car was not found.
   */
  carNotFound(id: string, lang: HeaderLanguage = 'en'): NotFoundException {
    this.logger.error(`Car with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__car_not_found[lang]);
  }

  /**
   * Checks if the given email is already taken and throws a BadRequestException if it is.
   *
   * @param {string} email - The email address to check.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message, defaults to 'en'.
   * @return {BadRequestException} Returns an exception indicating the email is already taken.
   */
  emailAlreadyTaken(
    email: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Email ${email} already taken`);
    return new BadRequestException(
      httpErrorMessages.__email_already_taken[lang]
    );
  }

  /**
   * Logs an error for a user not found and throws a NotFoundException.
   *
   * @param {string} id - The unique identifier of the user.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message.
   * @return {NotFoundException} - The exception indicating the user was not found.
   */
  userNotFound(id: string, lang: HeaderLanguage = 'en'): NotFoundException {
    this.logger.error(`User with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__user_not_found[lang]);
  }

  /**
   * Handles the case where a service with a specific ID is not found.
   *
   * @param {string} id - The unique identifier of the service that was not found.
   * @param {HeaderLanguage} [lang='en'] - The language used for the error message. Defaults to 'en' if not provided.
   * @return {NotFoundException} Returns a NotFoundException with a localized error message.
   */
  serviceNotFound(id: string, lang: HeaderLanguage = 'en'): NotFoundException {
    this.logger.error(`Service with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__service_not_found[lang]);
  }

  /**
   * Handles the scenario when a city is not found by logging the error and throwing a NotFoundException.
   *
   * @param {string} id - The unique identifier of the city that was not found.
   * @param {HeaderLanguage} [lang='en'] - The language code specifying the response message language. Defaults to 'en'.
   * @return {NotFoundException} The exception indicating the city was not found.
   */
  cityNotFound(id: string, lang: HeaderLanguage = 'en'): NotFoundException {
    this.logger.error(`City with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__city_not_found[lang]);
  }

  /**
   * Logs an error and throws a BadRequestException when the service is not public.
   *
   * @param {string} id - The identifier of the service that is not public.
   * @param {HeaderLanguage} lang - The language for the error message. Defaults to 'en'.
   * @return {BadRequestException} A BadRequestException containing the error message.
   */
  serviceNotPublic(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Service with id ${id} is not public`);
    return new BadRequestException(
      httpErrorMessages.__service_not_public[lang]
    );
  }

  /**
   * Logs an error and returns a BadRequestException when the service with the given ID is not private.
   *
   * @param {string} id - The unique identifier of the service that is not private.
   * @param {HeaderLanguage} [lang='en'] - The language used for the error message. Defaults to 'en'.
   * @return {BadRequestException} A BadRequestException containing the appropriate error message.
   */
  serviceNotPrivate(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Service with id ${id} is not private`);
    return new BadRequestException(
      httpErrorMessages.__service_not_private[lang]
    );
  }

  /**
   * Handles the case when a service is not available. Logs an error and throws a BadRequestException with a localized error message.
   *
   * @param {string} id - The identifier of the unavailable service.
   * @param {HeaderLanguage} [lang='en'] - The language code to select the localized error message. Defaults to 'en'.
   * @return {BadRequestException} An exception with the localized error message indicating the service is not available.
   */
  serviceNotAvailable(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Service with id ${id} is not available`);
    return new BadRequestException(
      httpErrorMessages.__service_not_available[lang]
    );
  }

  /**
   * Handles invalid password errors, logs the error, and throws a BadRequestException.
   *
   * @param {HeaderLanguage} [lang='en'] - The language to use for the error message. Defaults to 'en' (English).
   * @return {BadRequestException} The exception containing the localized error message for invalid password.
   */
  invalidPassword(lang: HeaderLanguage = 'en'): BadRequestException {
    this.logger.error(`Invalid password`);
    return new BadRequestException(httpErrorMessages.__invalid_password[lang]);
  }

  /**
   * Handles invalid login credential errors by logging and throwing an appropriate exception.
   *
   * @param {string} email - The email address associated with the invalid login attempt.
   * @param {HeaderLanguage} [lang='en'] - The language in which the error message should be returned.
   * @return {BadRequestException} A BadRequestException containing the localized error message.
   */
  invalidLoginCredential(
    email: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Invalid login credential for email ${email}`);
    return new BadRequestException(
      httpErrorMessages.__invalid_login_credential[lang]
    );
  }

  /**
   * Handles the case where a car order with the given ID is not found.
   *
   * @param {string} id - The unique identifier of the car order.
   * @param {HeaderLanguage} [lang='en'] - The language preference for the error message.
   * @return {NotFoundException} A not found exception containing the appropriate error message.
   */
  carOrderNotFound(id: string, lang: HeaderLanguage = 'en'): NotFoundException {
    this.logger.error(`Car order with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__car_order_not_found[lang]);
  }

  /**
   * Logs an error indicating that the order does not belong to the customer and throws a BadRequestException.
   *
   * @param {string} id - The ID of the order that does not belong to the customer.
   * @param {HeaderLanguage} [lang='en'] - The language to be used for the error message.
   * @return {BadRequestException} A BadRequestException containing the localized error message.
   */
  orderNotBelongToCustomer(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Order with id ${id} not belong to customer`);
    return new BadRequestException(
      httpErrorMessages.__order_not_belong_to_customer[lang]
    );
  }

  /**
   * Handles the case where an order is identified as not a normal type.
   *
   * @param {string} id - The unique identifier of the order.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message header, defaults to 'en'.
   * @return {BadRequestException} - Returns a BadRequestException with an appropriate error message.
   */
  orderNotNormalType(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Order with id ${id} is not normal type`);
    return new BadRequestException(
      httpErrorMessages.__order_not_normal_type[lang]
    );
  }

  /**
   * Logs an error and throws a BadRequestException when a service is not available for a specific city.
   *
   * @param {string} serviceId - The unique identifier of the service.
   * @param {string} cityId - The unique identifier of the city.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message. Defaults to English ('en').
   * @return {BadRequestException} Returns an instance of BadRequestException with an appropriate error message.
   */
  serviceNotAvailableForCity(
    serviceId: string,
    cityId: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(
      `Service with id ${serviceId} is not available for city with id ${cityId}`
    );
    return new BadRequestException(
      httpErrorMessages.__service_not_available_for_city[lang]
    );
  }

  /**
   * Logs an error and throws a BadRequestException when a specific service is not available for a given car model.
   *
   * @param {string} serviceId - The unique identifier of the service.
   * @param {string} carModelId - The unique identifier of the car model.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message, defaulting to 'en'.
   * @return {BadRequestException} Returns a BadRequestException with a localized error message.
   */
  serviceNotAvailableForCarModel(
    serviceId: string,
    carModelId: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(
      `Service with id ${serviceId} is not available for car model with id ${carModelId}`
    );
    return new BadRequestException(
      httpErrorMessages.__service_not_available_for_car_model[lang]
    );
  }

  /**
   * Handles scenarios where the car wash order with the provided ID is not found.
   * Logs an error message and returns a NotFoundException with a localized error message.
   *
   * @param {string} id - The ID of the car wash order that was not found.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message, defaulting to 'en'.
   * @return {NotFoundException} The exception containing the localized error message.
   */
  carWashOrderNotFound(
    id: string,
    lang: HeaderLanguage = 'en'
  ): NotFoundException {
    this.logger.error(`Car wash order with id ${id} not found`);
    return new NotFoundException(
      httpErrorMessages.__car_wash_order_not_found[lang]
    );
  }

  /**
   * Checks if a car wash order with a given ID has already been cancelled and throws a BadRequestException.
   *
   * @param {string} id - The unique identifier of the car wash order.
   * @param {HeaderLanguage} [lang='en'] - The language code used to retrieve the relevant error message.
   * @return {BadRequestException} Throws an exception with the appropriate localized error message.
   */
  carWashOrderAlreadyCancelled(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car wash order with id ${id} already cancelled`);
    return new BadRequestException(
      httpErrorMessages.__car_wash_order_already_cancelled[lang]
    );
  }

  /**
   * Checks if a car order does not belong to the agent and logs an error if so.
   * Throws a BadRequestException with the relevant error message.
   *
   * @param {string} id - The ID of the car order to be verified.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message. Defaults to 'en'.
   * @return {BadRequestException} Throws an exception indicating the car order does not belong to the agent.
   */
  carOrderNotBelongToAgent(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car order with id ${id} not belong to agent`);
    return new BadRequestException(
      httpErrorMessages.__car_order_not_belong_to_agent[lang]
    );
  }

  /**
   * Checks if a car order is already cancelled and logs an error message.
   * Throws a BadRequestException if the car order is already cancelled.
   *
   * @param {string} id - The unique identifier of the car order.
   * @param {HeaderLanguage} [lang='en'] - The language for the error message.
   * @return {BadRequestException} The exception indicating the car order is already cancelled.
   */
  carOrderAlreadyCancelled(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car order with id ${id} already cancelled`);
    return new BadRequestException(
      httpErrorMessages.__car_order_already_cancelled[lang]
    );
  }

  /**
   * Handles cases where the provided one-time password (OTP) is incorrect.
   *
   * @param {string} otpCode - The incorrect OTP that was provided.
   * @param {HeaderLanguage} [lang='en'] - The language in which the error message should be returned.
   * @return {BadRequestException} An exception indicating that the provided OTP is incorrect.
   */
  otpIncorrect(
    otpCode: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Otp incorrect (${otpCode})`);
    return new BadRequestException(httpErrorMessages.__otp_incorrect[lang]);
  }

  /**
   * Logs an error message and returns a NotFoundException for a missing notification.
   *
   * @param {string} id - The identifier of the notification that was not found.
   * @param {HeaderLanguage} [lang='en'] - The language in which the error message should be returned.
   * @return {NotFoundException} An exception representing the "notification not found" error.
   */
  notificationNotFound(
    id: string,
    lang: HeaderLanguage = 'en'
  ): NotFoundException {
    this.logger.error(`Notification with id ${id} not found`);
    return new NotFoundException(
      httpErrorMessages.__notification_not_found[lang]
    );
  }

  /**
   * Handles the case where a notification has already been read and throws a BadRequestException.
   *
   * @param {string} id - The unique identifier of the notification.
   * @param {HeaderLanguage} [lang='en'] - The language to use for the error message.
   * @return {BadRequestException} An exception indicating the notification has already been read.
   */
  notificationAlreadyRead(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Notification with id ${id} already read`);
    return new BadRequestException(
      httpErrorMessages.__notification_already_read[lang]
    );
  }

  /**
   * Logs an error indicating that an agent with the specified ID was not found,
   * and throws a NotFoundException with a localized error message.
   *
   * @param {string} id - The unique identifier of the agent that was not found.
   * @param {HeaderLanguage} [lang='en'] - The language in which the error message should be returned.
   * @return {NotFoundException} - An exception indicating that the agent was not found.
   */
  agentNotFound(id: string, lang: HeaderLanguage = 'en'): NotFoundException {
    this.logger.error(`Agent with id ${id} not found`);
    return new NotFoundException(httpErrorMessages.__agent_not_found[lang]);
  }

  /**
   * Handles the scenario when an agent with the provided ID is not available.
   *
   * @param {string} id - The unique identifier of the agent that is not available.
   * @param {HeaderLanguage} [lang='en'] - The language in which the error message should be returned.
   * @return {BadRequestException} A BadRequestException containing the error message for the unavailable agent.
   */
  agentNotAvailable(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Agent with id ${id} not available`);
    return new BadRequestException(
      httpErrorMessages.__agent_not_available[lang]
    );
  }

  /**
   * Checks if a car wash order has already been taken and throws a BadRequestException if true.
   *
   * @param {string} id The unique identifier of the car wash order.
   * @param {HeaderLanguage} [lang='en'] The language for the error message, defaulting to English.
   * @return {BadRequestException} An exception indicating that the car wash order has already been taken.
   */
  carWashOrderAlreadyTaken(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car wash order with id ${id} already taken`);
    return new BadRequestException(
      httpErrorMessages.__car_wash_order_already_taken[lang]
    );
  }

  /**
   * Checks if a car wash order has already been canceled by the customer and throws a BadRequestException if true.
   *
   * @param {string} id - The identifier of the car wash order.
   * @param {HeaderLanguage} [lang='en'] - The language used for the error message.
   * @return {BadRequestException} Returns a BadRequestException indicating the order was already canceled by the customer.
   */
  carWashOrderAlreadyCanceledByCustomer(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(
      `Car wash order with id ${id} already canceled by customer`
    );
    return new BadRequestException(
      httpErrorMessages.__car_wash_order_already_canceled_by_customer[lang]
    );
  }

  /**
   * Throws a `BadRequestException` if a car wash order is not assigned to an agent.
   *
   * @param {string} id - The unique identifier of the car wash order.
   * @param {HeaderLanguage} [lang='en'] - The preferred language for the error message.
   * @return {BadRequestException} A BadRequestException with a localized error message.
   */
  carWashOrderNotAssignedToAgent(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car wash order with id ${id} not assigned to agent`);
    return new BadRequestException(
      httpErrorMessages.__car_wash_order_not_assigned_to_agent[lang]
    );
  }

  /**
   * Handles the scenario where a car wash order has already been canceled by an agent.
   * Logs an error message and returns a BadRequestException with an appropriate message.
   *
   * @param {string} id - The unique identifier of the car wash order.
   * @param {HeaderLanguage} [lang='en'] - The language to use for the error message. Defaults to 'en' (English).
   * @return {BadRequestException} A BadRequestException containing the localized error message.
   */
  carWashOrderAlreadyCanceledByAgent(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car wash order with id ${id} already canceled by agent`);
    return new BadRequestException(
      httpErrorMessages.__car_wash_order_already_canceled_by_agent[lang]
    );
  }

  /**
   * Checks if a car wash order has already been started and throws an exception if it has.
   *
   * @param {string} id - The unique identifier of the car wash order.
   * @param {HeaderLanguage} [lang='en'] - The language in which the error message should be returned.
   * @return {BadRequestException} An exception indicating that the car wash order has already started.
   */
  carWashOrderAlreadyStarted(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car wash order with id ${id} already started`);
    return new BadRequestException(
      httpErrorMessages.__car_wash_order_already_started[lang]
    );
  }

  /**
   * Checks if a car wash order has already been completed and throws an exception if true.
   *
   * @param {string} id - The unique identifier of the car wash order.
   * @param {HeaderLanguage} [lang='en'] - The language used for the error message.
   * @return {BadRequestException} Throws an exception indicating the car wash order has already been completed.
   */
  carWashOrderAlreadyCompleted(
    id: string,
    lang: HeaderLanguage = 'en'
  ): BadRequestException {
    this.logger.error(`Car wash order with id ${id} already completed`);
    return new BadRequestException(
      httpErrorMessages.__car_wash_order_already_completed[lang]
    );
  }
}
