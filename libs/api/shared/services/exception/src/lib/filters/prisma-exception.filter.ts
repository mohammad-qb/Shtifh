import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { GqlContextType } from '@nestjs/graphql'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ApiError } from '../api.error'

@Catch(PrismaClientKnownRequestError)
export class PrismaClientKnownErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientKnownRequestError.name)

  catch(error: PrismaClientKnownRequestError, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      this.logger.error(error)

      // Unique constraint error (duplicate)
      if (error.code === 'P2002') {
        const modelName: string | undefined = error?.meta?.['modelName'] as string | undefined
        const fields: string[] | undefined = error?.meta?.['target'] as string[] | undefined

        const explanation = `It looks like you tried to enter a ${modelName} that already exists. Please make sure that the ${fields?.join(
          ' and '
        )} you are trying to use is unique.`

        return new ApiError(
          `Unique constraint error on ${modelName || 'model'} failed for ${
            fields?.join(', ') || 'certain fields'
          }`,
          {
            statusCode: 400,
            explanation: explanation,
            meta: error.meta,
            type: 'unique_constraint_error',
          }
        )
      }

      return error
    }

    return error
  }
}
