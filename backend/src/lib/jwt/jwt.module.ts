import { Global, Module } from '@nestjs/common';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config';

@Global()
@Module({
  imports: [
    _JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.env.JWT_SECRET,
          signOptions: { expiresIn: config.env.JWT_EXPIRES_IN },
        };
      },
    }),
  ],
  exports: [_JwtModule],
})
export class JwtModule {}
