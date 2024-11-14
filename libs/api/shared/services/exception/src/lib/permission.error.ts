import { HttpStatus } from '@nestjs/common'
import { ApiError, ApiErrorParams } from './api.error'

export class PermissionError extends ApiError {
  constructor(params?: ApiErrorParams & { message: string }) {
    super(params?.message || 'You do not have permission to perform this action', {
      statusCode: HttpStatus.FORBIDDEN,
    })
  }
}
