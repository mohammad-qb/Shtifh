import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server'
import { Plugin } from '@nestjs/apollo'

@Plugin()
export class LoggerPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    return {
      async didResolveOperation(ctx) {
        const isIntrospection = ctx?.request?.query?.includes('__schema')

        if (isIntrospection) return

        const operationType = ctx?.operation?.operation === 'query' ? 'Query' : 'Mutation'

        console.log(`${operationType} (${ctx.operationName})`)
      },
    }
  }
}
