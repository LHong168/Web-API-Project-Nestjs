import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfigDto {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  JWT_SECRET: string;

  @IsNotEmpty()
  JWT_EXPIRES_IN: string;
}
