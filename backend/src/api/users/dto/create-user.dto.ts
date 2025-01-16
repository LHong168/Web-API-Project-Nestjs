import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Role } from 'src/common/role/role.enum';
import { passwordRegEx } from 'utils/helpers';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @ApiProperty({ description: 'The username of the User', example: 'John Doe' })
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  @ApiProperty({ description: 'The email address of the User', example: 'john.doe@gmail.com' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: 'Password must be at least 8 characters long and contain only letters and numbers.'
  })
  @ApiProperty({ description: 'The password of the User', example: 'Password@123' })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ description: 'The role of the user', example: 'USER' })
  role: Role;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '', example: '', required: false })
  refreshToken?: string;
}
