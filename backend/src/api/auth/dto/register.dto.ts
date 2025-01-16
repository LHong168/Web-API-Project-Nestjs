import { IsAlphanumeric, IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

import { passwordRegEx } from './login.dto';

export class AuthRegisterDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsAlphanumeric('en-US', {
    message: 'Username does not allow other than alpha numeric chars.'
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain at least one number and be at least 8 characters long`
  })
  password: string;
}
