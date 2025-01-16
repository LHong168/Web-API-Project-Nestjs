import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { AuthLoginDto } from './login.dto';

export class AuthRegisterDto extends AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  username: string;
}
