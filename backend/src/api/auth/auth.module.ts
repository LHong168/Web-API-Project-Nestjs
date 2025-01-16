import { Module } from '@nestjs/common';
import { JwtModule } from 'src/lib/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
