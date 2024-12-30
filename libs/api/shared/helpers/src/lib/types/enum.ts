export enum CarOrderLogStatus {
  CREATED,
  SEARCHING,
  PENDING_PAYMENT,
  IN_PROGRESS,
  COMPLETED,
  CONFIRMED,
  CANCELED_BY_CUSTOMER,
  CANCELED_BY_AGENT,
  ACCEPTED_BY_AGENT
}

export enum AgentPosition {
  STANDARD_CAR_WASHER, // For the standard service
  EXPRESS_CAR_WASHER, // For the quick service
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
  HE,
}

export enum UserRole {
  ADMIN,
  CUSTOMER,
  AGENT,
}

export enum CarServiceType {
  PRIVATE,
  PUBLIC,
}

export enum Gender {
  MALE,
  FEMALE,
}

export enum CarOrderType {
  PRIVATE,
  NORMAL,
}

export enum PaymentMethod {
  CASH,
  CREDIT_CARD,
}

export enum PaymentStatus {
  PENDING,
  COMPLETED,
  CANCELED,
}

export enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export enum NotificationType {
  CAR_ORDER_STATUS_CHANGE,
  EXPRESS_CAR_WASH_ORDER_STATUS_CHANGE,
  ORDER_REMINDER,
  OFFER,
  ADMIN_MESSAGE,
}

export enum Colors {
  // Row 1
  RED = '#FF0000',
  ORANGE = '#FFA500',
  LIGHT_BLUE = '#1E90FF',
  DARK_BLUE = '#6A5ACD',
  WHITE = '#FFFFFF',
  BLACK = '#000000',

  // Row 2
  LIGHT_GRAY = '#D3D3D3',
  GRAY = '#808080',
  LIGHT_ORANGE = '#FFC078',
  YELLOW = '#FFD700',
  SKY_BLUE = '#87CEEB',
  ROYAL_BLUE = '#4169E1',

  // Row 3
  LAVENDER = '#E6E6FA',
  LIGHT_PURPLE = '#D8BFD8',
  TEAL = '#20B2AA',
  LIGHT_GREEN = '#90EE90',
  PINK = '#FFB6C1',
  SALMON = '#FA8072',

  // Row 4
  DARK_GREEN = '#006400',
  DARK_RED = '#8B0000',
  TURQUOISE = '#40E0D0',
  SEA_GREEN = '#2E8B57',
  LIGHT_PINK = '#FF69B4',
  DARK_PINK = '#FF1493',
}
