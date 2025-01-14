import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export const passwordRegEx = /^(?=.*\d)[A-Za-z\d]{8,}$/;

export class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain at least one number and be at least 8 characters long`,
  })
  password: string;
}
