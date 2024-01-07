import { Module, DynamicModule, Global } from '@nestjs/common';
import { EnvService } from './env.service';

@Global()
@Module({})
export class EnvModule {
  static forRoot(env: Record<string, any>): DynamicModule {
    return {
      module: EnvModule,
      providers: [
        {
          provide: EnvService,
          useValue: new EnvService(env),
        },
      ],
      exports: [EnvService],
    };
  }
}
