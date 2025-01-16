import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard, RequestWithUser } from 'src/common/guards/authenticate.guard';

import { RolesGuard } from '@/common/guards/role.guard';

import { Roles } from '../../common/role/role.decorator';
import { Role } from '../../common/role/role.enum';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ description: 'Get a list of users' })
  findAll(@Request() req: RequestWithUser) {
    return this.userService.findAllUser(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({ description: 'User details' })
  findOne(@Param('id') id: string) {
    return this.userService.findByUserId(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'Updated user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOkResponse({ description: 'Deletion successful' })
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
