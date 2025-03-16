import { LoggerService } from '@nestjs/common';

export interface RequestLoggerOptions {
  loggerService?: LoggerService;
  headerName?: string;  
  excludePaths?: string[];
  excludePathRegex?: RegExp[];
  sensitiveHeaders?: string[];
  sensitiveParams?: string[];
  maskText?: string;  
  logHeaders?: boolean;
  logParams?: boolean;
  logBody?: boolean;
  maxBodyLength?: number;
}

export interface RequestData {
  requestId: string;
  timestamp: string;
  method: string;
  originalUrl: string;
  path: string;
  ip: string;
  userAgent: string;
  params?: any;
  headers?: any;
  body?: string;
}