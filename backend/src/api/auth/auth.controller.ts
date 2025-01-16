import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { AuthGuard, RequestWithUser } from '@/common/guards/authenticate.guard';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { AuthRegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  @ApiOkResponse({ description: 'Login successful' })
  logIn(@Body() logInDto: AuthLoginDto) {
    return this.authService.logIn(logInDto.email, logInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiBody({ type: AuthRegisterDto })
  @ApiCreatedResponse({ description: 'User registered successfully' })
  signUp(@Body() signInDto: AuthRegisterDto) {
    return this.authService.signUp(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'User Logout successfully' })
  logOut(@Param('id') id: string): Promise<void> {
    return this.authService.logOut(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get user details' })
  readMe(@Request() req: RequestWithUser) {
    return this.userService.findByEmail(req.user.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get and change refresh token' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    const payload = await this.authService.validateRefreshToken(refreshToken);
    return this.authService.generateTokens({
      sub: payload.sub,
      email: payload.email,
      role: payload.role
    });
  }
}
