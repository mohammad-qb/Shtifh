import { LiteralUnion } from 'type-fest'

export type ApiErrorType = LiteralUnion<
  'api_error' | 'authorization_error' | 'authenticate_error' | 'unique_constraint_error', string
>
