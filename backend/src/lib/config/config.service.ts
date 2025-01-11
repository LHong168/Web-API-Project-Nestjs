import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ConfigDto } from './config.dto';

@Injectable()
export class ConfigService {
  readonly env: ConfigDto;

  private readonly envConfig: { [prop: string]: string };

  constructor() {
    this.envConfig = process.env as never;
    this.env = this.validate('ConfigModule', ConfigDto);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  validate<T>(module: string, className: new () => T): T {
    const config = plainToClass(className, this.envConfig, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(config as never, {
      skipMissingProperties: false,
    });
    if (errors.length > 0) {
      errors.forEach((e) =>
        Logger.error(
          `${e.constraints?.[Object.keys(e.constraints)[0]]}`,
          module,
        ),
      );
      throw new Error(`${module}: Invalid environment config.`);
    }
    return config;
  }
}
