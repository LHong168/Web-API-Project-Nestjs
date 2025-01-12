import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { isPasswordMatched } from 'utils/hash-password';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto } from './auth.dto';
import { Role } from '../../common/role/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !isPasswordMatched(pass, user?.password)) {
      throw new UnauthorizedException('Invalid User Credential.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(authenticateDto: AuthenticateDto): Promise<any> {
    const user = await this.usersService.findByEmail(authenticateDto.email);

    if (user) return new ConflictException('User already exist');

    const newUser = await this.usersService.createUser({
      ...authenticateDto,
      role: Role.USER,
    });

    const payload = { sub: newUser.id, email: newUser.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
