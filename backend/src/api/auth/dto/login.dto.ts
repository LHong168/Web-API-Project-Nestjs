import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { passwordRegEx } from 'utils/helpers';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: 'Password must be at least 8 characters long and contain only letters and numbers.'
  })
  @ApiProperty({ example: 'Password@123' })
  password: string;
}
