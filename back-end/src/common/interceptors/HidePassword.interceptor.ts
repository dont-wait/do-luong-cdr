import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  
  @Injectable()
  export class HidePasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<{ user: Omit<UserAccountResponseData, 'password'>}> {
      return next.handle().pipe(
        map((data) => {
          return  { 
            user:this.removePassword(data.user),
            access_token: data.access_token,
          };
        }),
      );
    }
  
    private removePassword(obj: UserAccountResponseData) {
        const { password, ...rest } = obj;
        return rest;
    }
  }
  