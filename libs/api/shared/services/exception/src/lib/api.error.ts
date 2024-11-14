import { HttpException } from '@nestjs/common'
import { ApiErrorType } from './types/api-error-codes'
import { BaseApiError } from './types/base-api.error'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApiErrorParams extends Omit<BaseApiError, 'message'> {
  /**
   * Use the message as the explanation.
   * Useful when you only want to show the user the
   * explanation of the error
   */
  isMessageExplanation?: boolean
}

export class ApiError extends HttpException implements ApiErrorParams {
  statusCode!: number
  type!: ApiErrorType
  meta?: Record<string, unknown>
  code?: number
  explanation?: string | undefined

  constructor(readonly message: string, params?: ApiErrorParams) {
    const statusCode = params?.statusCode || 400

    super({ message, ...params }, statusCode)

    this.message = message
    this.statusCode = statusCode
    this.code = params?.code
    this.meta = params?.meta
    this.explanation = params?.isMessageExplanation
      ? params.explanation || message
      : params?.explanation
    this.type = params?.type || 'api_error'
  }

  toObject(): ApiErrorParams {
    return {
      statusCode: this.statusCode,
      code: this.code,
      explanation: this.explanation,
      meta: this.meta,
      type: this.type,
    }
  }
}
