import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AppServerModuleModule } from '@shtifh/app-server-module';
import { Settings } from 'luxon';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from '@shtifh/env-service';
import { UserModule } from '@shtifh/user-service';

Settings.defaultZone = 'UTC';

const CONFIG_MODULE_OPTIONS: ConfigModuleOptions = {
  envFilePath: ['.env.development.local', '.env.development', '.env'],
  load: [
    () => {
      return {};
    },
  ],
  isGlobal: true,
  // validate: validateEnv,
  validationOptions: {
    abortEarly: true,
  },
  cache: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
    AppServerModuleModule,
    EnvModule.forRoot(process.env),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
