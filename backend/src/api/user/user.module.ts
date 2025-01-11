import { Module } from '@nestjs/common';
import { UserService as _UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [_UserService],
  exports: [_UserService],
})
export class UserModule {}
