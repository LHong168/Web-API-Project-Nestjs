import { ApiProperty } from '@nestjs/swagger';

export class ResponseTokenDto {
  @ApiProperty({ example: 'ey...' })
  access_token: string;

  @ApiProperty({ example: 'ey...' })
  refresh_token: string;
}

export class BodyTokenDto {
  @ApiProperty({ example: 'ey...' })
  refreshToken: string;
}
