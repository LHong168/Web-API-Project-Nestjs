import { Module } from '@nestjs/common';
import { ConfigModule } from './lib/config';
import { JwtModule } from './lib/jwt';

@Module({
  imports: [ConfigModule, JwtModule],
})
export class AppModule {}
