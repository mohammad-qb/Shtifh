import {
  Module
} from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AppServerModuleModule } from '@shtifh/app-server-module';
import { Settings } from 'luxon';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    AppServerModuleModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
