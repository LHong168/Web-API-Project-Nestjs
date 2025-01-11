import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { isPasswordMatched } from 'utils/hash-password';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthenticateDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!isPasswordMatched(pass, user?.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(authenticateDto: AuthenticateDto): Promise<any> {
    const user = await this.usersService.findByEmail(authenticateDto.email);

    if (user) return new ConflictException('User already exist');

    const newUser = await this.usersService.createUser(authenticateDto);

    const payload = { sub: newUser.id, email: newUser.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
