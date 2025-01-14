import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './auth.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard, RequestWithUser } from '@/common/guards/authenticate.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: Omit<AuthenticateDto, 'username'>) {
    return this.authService.logIn(logInDto.email, logInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signInDto: AuthenticateDto) {
    return this.authService.signUp(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(AuthGuard)
  readMe(@Request() req: RequestWithUser) {
    return this.userService.findByEmail(req.user.email);
  }
}
