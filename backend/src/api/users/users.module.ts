import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService as _UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [_UsersService],
  exports: [_UsersService]
})
export class UsersModule {}
