import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiHeader } from '@nestjs/swagger';
import type { Request } from 'express';

const headerScheme = 'Authorization';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const authorization = req.get(headerScheme) || '';

    const [scheme, token] = authorization.split(' ');
    const isCorrectScheme = scheme.toLowerCase() !== 'bearer';
    if (isCorrectScheme)
      throw new UnauthorizedException('Invalid Authorization Scheme');

    if (!token) throw new UnauthorizedException('Invalid Authorization Token');

    try {
      // Decoded token from header
      const payload = await this.jwtService.verifyAsync(token);
      req['user'] = payload;

      return true;
    } catch (e) {
      throw new UnauthorizedException(`${e.name} ${e.message}`);
    }
  }
}

/**
 * The verification of the credentials of the connection attempt. Or the act of logging a user in.
 * @description https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
 */
export const UseAuthenticateGuard = () =>
  applyDecorators(
    UseGuards(AuthenticateGuard),
    ApiHeader({
      name: headerScheme,
      example: 'Bearer 5e3047...',
      description: 'Bearer token that generate from Authorize',
    }),
  );
