import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { passwordRegEx } from 'src/api/auth/dto/login.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The new password of the User',
    example: 'Password@123',
  })
  @Matches(passwordRegEx, {
    message: `Password must contain at least one number and be at least 8 characters long`,
  })
  newPassword: string;
}
