import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleOAuth2Client extends OAuth2Client {
  constructor() {
    console.log(process.env.GOOGLE_CLIENT_ID);
    super({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      redirectUri: 'postmessage',
    });
  }
}
