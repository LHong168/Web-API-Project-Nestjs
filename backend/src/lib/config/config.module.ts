import { Global, Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import dbConfig from 'src/database/db.config';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [_ConfigModule.forRoot({ load: [dbConfig] })],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
