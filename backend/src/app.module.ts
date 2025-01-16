import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { AppService } from './app.service';
import dbConfig from './database/db.config';
import { ConfigModule } from './lib/config';
import { JwtModule } from './lib/jwt';

@Module({
  providers: [AppService],
  imports: [TypeOrmModule.forRootAsync({ useFactory: dbConfig }), ConfigModule, JwtModule, UsersModule, AuthModule]
})
export class AppModule {}
