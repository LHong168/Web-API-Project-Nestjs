import { Module } from '@nestjs/common';
import { ConfigModule } from './lib/config';
import { JwtModule } from './lib/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database/db.config';
import { UserModule } from './api/user/user.module';
import { AuthController } from './api/auth/auth.controller';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: dbConfig }),
    ConfigModule,
    JwtModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
