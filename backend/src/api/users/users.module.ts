import { Module } from '@nestjs/common';
import { UsersService as _UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [_UsersService],
  exports: [_UsersService],
})
export class UsersModule {}
