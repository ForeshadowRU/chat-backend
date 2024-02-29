/**
 * Если вы видите этот тип, то это `unixTimeStamp`
 * https://www.unixtimestamp.com/
 */
type UnixTimeStamp = number;
/**
 * Ссылка
 */
type EntityUrl = string;
export type GoogleUserInfo = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: EntityUrl;
  given_name: string;
  family_name: string;
  locale: string;
  iat: UnixTimeStamp;
  exp: UnixTimeStamp;
};
