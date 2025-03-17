import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
import { Request, Response } from 'express';

  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      let details = {};

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        details = exceptionResponse;
      }

      response.status(status).json({
        statusCode: status,
        message: 'Error',
        error: exception.name,
        details,
        path: request.url
      });
    }
  }
  