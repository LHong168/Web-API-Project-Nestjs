import { Global, Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';
import dbConfig from 'src/database/db.config';

@Global()
@Module({
  imports: [_ConfigModule.forRoot({ load: [dbConfig] })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
