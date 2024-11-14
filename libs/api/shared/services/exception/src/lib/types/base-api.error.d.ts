import { ApiErrorType } from './api-error-codes'
import { UnknownRecord } from 'type-fest'

export interface BaseApiError {
  message: string
  type?: ApiErrorType
  statusCode?: number
  meta?: UnknownRecord
  code?: number
  explanation?: string
}

export interface BaseApiErrorResponse {
  statusCode: number
  message: string
  path: string
  timestamp: string
  type: ApiErrorType

  meta?: UnknownRecord
  code?: number
  explanation?: string
}
