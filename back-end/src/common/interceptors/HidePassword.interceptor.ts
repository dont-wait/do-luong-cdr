import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  
  @Injectable()
  export class HidePasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Omit<UserAccountResponseData, 'password'>> {
      return next.handle().pipe(
        map((data: UserAccountResponseData) => {
          return this.removePassword(data);
        }),
      );
    }
  
    private removePassword(obj: UserAccountResponseData) {
        const { password, ...rest } = obj;
        return rest;
    }
  }
  