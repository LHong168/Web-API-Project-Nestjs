import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { passwordRegEx } from 'src/api/auth/dto/login.dto';
import { Role } from 'src/common/role/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the User',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric('en-US', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain at least one number and be at least 8 characters long`,
  })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'USER | ADMIN',
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: 'Optional refresh token for the user',
    example: 'some_refresh_token_string',
    required: false,
  })
  @IsOptional()
  refreshToken?: string;
}
