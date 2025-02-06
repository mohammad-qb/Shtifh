import { AccessoryResourceModule } from './resources/accessory/accessory-resource.module';
import { CarBrandResourceModule } from './resources/car-brand/car-brand-resource.module';
import { CarModelResourceModule } from './resources/car-model/car-model-resource.module';
import { CarOrderResourceModule } from './resources/car-order/car-order-resource.module';
import { CarResourceModule } from './resources/car/car-resource.module';
import { CityResourceModule } from './resources/city/city-resource.module';
import { CustomerResourceModule } from './resources/customer/customer-resource.module';
import { UserResourceModule } from './resources/user/user-resource.module';
import { PrismaModule } from '@shtifh/prisma-service';
import { ApolloServerPlugin } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import {
  apolloErrorFormatter,
  ExceptionModule,
  PrismaClientKnownErrorFilter,
} from '@shtifh/exception-service';
import { LoggerPlugin } from '@shtifh/plugins';
import { join } from 'path';
import { EnvModule } from '@shtifh/env-service';
import { NotificationResourceModule } from './resources/notification/notification-resource.module';
import { ServicesResourceModule } from './resources/services/services-resource.module';
import { ExpressCarWashOrderResourceModule } from './resources/express-car-wash-order/express-car-wash-order-resource.module';
import { AgentServerModule } from '@shtifh/agent-server-module';

const GRAPHQL_MODULES = [
  AccessoryResourceModule,
  CarResourceModule,
  CarBrandResourceModule,
  CarModelResourceModule,
  CarOrderResourceModule,
  CityResourceModule,
  CustomerResourceModule,
  NotificationResourceModule,
  UserResourceModule,
  ServicesResourceModule,
  ExpressCarWashOrderResourceModule,
];

const DEVELOPMENT_APOLLO_PLUGINS: ApolloServerPlugin[] = [
  ApolloServerPluginLandingPageLocalDefault({
    includeCookies: true,
    variables: {
      settings: {
        'request.credentials': 'include',
      },
    },
  }),
];
const PRODUCTION_APOLLO_PLUGINS: ApolloServerPlugin[] = [];

const APOLLO_PLUGINS: ApolloServerPlugin[] =
  process.env?.['NODE_ENV'] === 'development'
    ? DEVELOPMENT_APOLLO_PLUGINS
    : PRODUCTION_APOLLO_PLUGINS;

@Module({
  imports: [
    ...GRAPHQL_MODULES,
    AgentServerModule,
    PrismaModule,
    ExceptionModule,
    EnvModule.forRoot(process.env),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: APOLLO_PLUGINS,
      playground:
        process.env?.['NODE_ENV'] === 'production'
          ? {
              settings: {
                'request.credentials': 'include',
              },
            }
          : false,
      introspection: true,
      formatError: apolloErrorFormatter,
      autoTransformHttpErrors: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: (args: { req: Request; res: Response }) => args,
    }),
  ],
  providers: [
    LoggerPlugin,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientKnownErrorFilter,
    },
  ],
})
export class AppServerModuleModule {}
