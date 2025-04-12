import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';
  
@Injectable()
export class CookiesInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<UserAccountResponseData> {

        return next.handle().pipe(
        tap((data: UserAccountResponseData) => {
                const res = context.switchToHttp().getResponse() as Response;

                res.cookie('access_token', data.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 1000,
                });
            }),
      );
    }
  
}