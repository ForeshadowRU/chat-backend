import { User } from 'src/models/user';

export type LoginResponse = {
  auth_token: string;
  user: User;
};
