import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const statusCode = request.method === 'POST' ? 201 : 200;
      
      return next
        .handle()
        .pipe(
        map((data) => ({
          statusCode,
          message: 'Success',
          data,
        })),
      );
    }
  }
  