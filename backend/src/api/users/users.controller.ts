import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseAuthenticateGuard } from 'src/common/guards/authenticate.guard';
import { Roles } from '../../common/role/role.decorator';
import { Role } from '../../common/role/role.enum';
import { RolesGuard } from '../../common/role/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @UseAuthenticateGuard()
  findOne(@Param('id') id: string) {
    return this.userService.findByUserId(+id);
  }

  @Patch(':id')
  @UseAuthenticateGuard()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @UseAuthenticateGuard()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
