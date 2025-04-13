import 'express';

declare module 'express' {
  interface Request {
    user: Omit<UserAccountResponseData, 'password'>;
  }
}
