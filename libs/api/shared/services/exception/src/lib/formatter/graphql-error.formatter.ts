import { unwrapResolverError } from '@apollo/server/errors'
import { BadRequestException } from '@nestjs/common'
import { AxiosError } from 'axios'
import { GraphQLFormattedError } from 'graphql'
import { ApiError } from '../api.error'


type FormatErrorFn = (
  formattedError: GraphQLFormattedError,
  error: unknown
) => GraphQLFormattedError

export const apolloErrorFormatter: FormatErrorFn = (formattedError, error) => {
  let errorObject: object = {}
  const unwrappedError = unwrapResolverError(error)

  if (unwrappedError instanceof ApiError) {
    errorObject = unwrappedError.toObject()
  }

  if (unwrappedError instanceof BadRequestException) {
    errorObject = {
      primaryError: unwrappedError.getResponse(),
    }
  }

  if (unwrappedError instanceof AxiosError) {
    errorObject = {
      primaryError: unwrappedError.response?.data,
    }
  }

  return {
    message: formattedError.message,
    ...errorObject,
    path: formattedError.path,
    locations: formattedError.locations,
  }
}
