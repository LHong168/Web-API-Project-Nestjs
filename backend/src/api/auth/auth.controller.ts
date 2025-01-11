import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { AuthenticateDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
