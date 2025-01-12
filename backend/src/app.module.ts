import { Module } from '@nestjs/common';
import { ConfigModule } from './lib/config';
import { JwtModule } from './lib/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database/db.config';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { AppService } from './app.service';

@Module({
  providers: [AppService],
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: dbConfig }),
    ConfigModule,
    JwtModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
