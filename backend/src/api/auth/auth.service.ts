import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { isPasswordMatched } from 'utils/hash-password';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../common/role/role.enum';
import { AuthRegisterDto } from './dto/register.dto';

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

    const tokens = this.generateTokens(payload);

    // store the refresh token in the database
    await this.usersService.updateUserRefreshToken(
      user.id,
      tokens.refresh_token,
    );

    return tokens;
  }

  async signUp(authenticateDto: AuthRegisterDto): Promise<any> {
    const user = await this.usersService.findByEmail(authenticateDto.email);

    if (user) throw new ConflictException('User already exists');

    const newUser = await this.usersService.createUser({
      ...authenticateDto,
      role: Role.USER,
    });

    const payload = { sub: newUser.id, email: newUser.email };

    const tokens = this.generateTokens(payload);

    // store the refresh token in the database
    await this.usersService.updateUserRefreshToken(
      payload.sub,
      tokens.refresh_token,
    );

    return tokens;
  }

  generateTokens(payload: any) {
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { access_token, refresh_token };
  }

  async validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
