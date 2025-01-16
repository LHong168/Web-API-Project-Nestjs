import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches, ValidateIf } from 'class-validator';
import { passwordRegEx } from 'utils/helpers';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password', 'role'])) {
  @IsOptional()
  @ValidateIf((_, value) => value !== '')
  @Matches(passwordRegEx, {
    message: 'Password must be at least 8 characters long and contain only letters and numbers.'
  })
  @ApiProperty({ description: 'The password of the User', example: 'Password@123' })
  password: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== '')
  @Matches(passwordRegEx, {
    message: 'New Password must be at least 8 characters long and contain only letters and numbers.'
  })
  @ApiProperty({ description: 'The new password of the User', example: 'Password@456' })
  newPassword: string;
}
