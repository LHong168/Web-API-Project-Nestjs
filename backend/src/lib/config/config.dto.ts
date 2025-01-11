import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfigDto {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  ADMIN_EMAIL: string;

  @IsNotEmpty()
  ADMIN_PASSWORD: string;

  @IsNotEmpty()
  JWT_SECRET: string;

  @IsNotEmpty()
  JWT_EXPIRES_IN: string;
}
