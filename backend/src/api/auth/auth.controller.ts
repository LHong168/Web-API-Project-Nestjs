import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AuthGuard, RequestWithUser } from '@/common/guards/authenticate.guard';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ResponseTokenDto, AuthLoginDto, AuthRegisterDto, BodyTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ summary: 'Login User' })
  @ApiOkResponse({ type: ResponseTokenDto })
  logIn(@Body() logInDto: AuthLoginDto) {
    return this.authService.logIn(logInDto.email, logInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiBody({ type: AuthRegisterDto })
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: ResponseTokenDto })
  signUp(@Body() signInDto: AuthRegisterDto) {
    return this.authService.signUp(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({ description: 'User Logout successfully' })
  logOut(@Request() req: RequestWithUser): Promise<void> {
    return this.authService.logOut(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user detail' })
  @ApiOkResponse({ description: 'Get user details' })
  readMe(@Request() req: RequestWithUser) {
    return this.userService.findByEmail(req.user.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiBearerAuth()
  @ApiBody({ type: BodyTokenDto })
  @ApiOperation({ summary: 'Refresh user token and provide new access token' })
  @ApiOkResponse({ type: ResponseTokenDto })
  async refresh(@Body('refreshToken') refreshToken: string) {
    const payload = await this.authService.validateRefreshToken(refreshToken);
    return this.authService.generateTokens({
      sub: payload.sub,
      id: payload.id,
      email: payload.email,
      role: payload.role
    });
  }
}
