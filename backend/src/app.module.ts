import { Module } from '@nestjs/common';
import { ConfigModule } from './lib/config';
import { JwtModule } from './lib/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database/db.config';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: dbConfig }),
    ConfigModule,
    JwtModule,
    UserModule,
  ],
})
export class AppModule {}
