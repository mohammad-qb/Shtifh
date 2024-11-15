/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class DatabaseError extends HttpException {
  constructor(error: unknown) {
    const DEFAULT_MESSAGE = 'Unknown database error occurred.'
    let errorMessage

    if (error instanceof PrismaClientKnownRequestError) {
      errorMessage = getPrismaErrorMessage(error) || error.message || DEFAULT_MESSAGE
    }

    super({ message: errorMessage, meta: error }, HttpStatus.BAD_GATEWAY)
  }
}

const getPrismaErrorMessage = (error: PrismaClientKnownRequestError) => {
  const prismaError = Object.entries(PRISMA_KNOWN_ERRORS).find(([key, { code, message }]) => {
    return error.code === code
  })

  if (!prismaError) return

  const [key, { code, message }] = prismaError

  if (message instanceof Function) {
    return message(error)
  }

  return prismaError?.[1].message
}

type PrismaErrorType = Record<typeof PRISMA_ERROR_TYPE[number], PrismaError>

interface PrismaError {
  code: string
  message: (error: PrismaClientKnownRequestError) => string | string
}

const PRISMA_ERROR_TYPE = ['foreignKeyFailure'] as const
const PRISMA_KNOWN_ERRORS: PrismaErrorType = {
  foreignKeyFailure: {
    code: 'P2003',
    message: (error) => `Foreign key failure`,
  },
}
