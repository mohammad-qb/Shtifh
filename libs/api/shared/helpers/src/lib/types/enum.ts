export enum CarOrderLogStatus {
  CREATED,
  PENDING_PAYMENT,
  IN_PROGRESS,
  COMPLETED,
  CONFIRMED,
  CANCELED_BY_CUSTOMER,
  CANCELED_BY_AGENT,
}

export enum AgentPosition {
  STANDARD_CAR_WASHER,  // For the standard service
  EXPRESS_CAR_WASHER,   // For the quick service
}

export enum ExpressCarWashOrderStatus {
  CREATED,
  PENDING_PAYMENT,
  AGENT_ON_THE_WAY,
  IN_PROGRESS,
  COMPLETED,
  CONFIRMED,
  CANCELED_BY_CUSTOMER,
  CANCELED_BY_AGENT,
}

export enum Language {
  EN,
  AR,
  HE
}

export enum UserRole {
  ADMIN,
  CUSTOMER,
  AGENT
}

export enum CarServiceType {
  PRIVATE,
  PUBLIC
}

export enum Gender {
  MALE,
  FEMALE
}

export enum CarOrderType {
  PRIVATE,
  NORMAL
}

export enum PaymentMethod {
  CASH,
  CREDIT_CARD
}

export enum PaymentStatus {
  PENDING,
  COMPLETED,
  CANCELED
}

export enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}
