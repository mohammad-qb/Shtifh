import { Injectable, Logger } from '@nestjs/common';
import { EnvName } from './types/env.type';

@Injectable()
export class EnvService {
  private logger = new Logger(EnvService.name);
  private readonly env: Record<string, any>;

  constructor(env: Record<string, any>) {
    this.env = env;
  }

  get(key: EnvName): string {
    return this.env[key];
  }
}
