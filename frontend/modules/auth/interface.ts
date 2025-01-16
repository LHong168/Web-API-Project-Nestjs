export interface AccessTokenResponse {
  access_token?: string | null;
  refresh_token?: string | null;
}

export interface AuthRegister {
  email: string;
  username: string;
  password: string;
}

export interface AuthLogin {
  email: string;
  password: string;
}
