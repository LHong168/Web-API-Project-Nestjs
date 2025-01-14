import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { passwordRegEx } from 'src/api/auth/dto/login.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== '')
  @Matches(passwordRegEx, {
    message: `Password must contain at least one number and be at least 8 characters long`,
  })
  password: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== '')
  @Matches(passwordRegEx, {
    message: `Password must contain at least one number and be at least 8 characters long`,
  })
  newPassword: string;
}
