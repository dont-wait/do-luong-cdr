import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
       return true;
      }
  
      const request = context.switchToHttp().getRequest() as Request;
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      try {
        const payload = await this.jwtService.verifyAsync<Omit<UserAccountResponseData, "password">>(token, {
          secret: process.env.JWT_SECRET,
        });
        
        request.user = payload;

      } catch {
        throw new UnauthorizedException("Invalid token");
      }

      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }