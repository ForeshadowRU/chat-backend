import { User } from 'src/models/user';

export class LoginResponse {
  accessToken: string;
  expiresAt: number;
  user: User;
};
