import { Injectable, NestMiddleware, Logger, LoggerService, Optional, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { RequestData, RequestLoggerOptions } from '../../types/logger';

const defaultOptions: RequestLoggerOptions = {
    headerName: 'X-Request-ID',
    excludePaths: [],
    sensitiveHeaders: ['authorization', 'cookie', 'set-cookie'],
    sensitiveParams: ['password', 'token', 'secret', 'key'],
    maskText: '[REDACTED]',
    logHeaders: false,
    logParams: true,
    logBody: false,
    maxBodyLength: 1000,
};

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly options: RequestLoggerOptions;
    private readonly logger: LoggerService;

    constructor(@Optional() @Inject('REQUEST_LOGGER_OPTIONS') options?: RequestLoggerOptions) {
        this.options = { ...defaultOptions, ...options };
        this.logger = options?.loggerService || new Logger('HTTP');
    }

    use(req: Request, res: Response, next: NextFunction): void {
        try {
            if (this.shouldSkip(req)) {
                return next();
            }

            const requestId = this.getOrGenerateRequestId(req);
            const requestData = this.captureRequestData(req, requestId);

            const startTime = process.hrtime();

            this.logRequest(requestData);

            const originalEnd = res.end;

            res.end = (...args: any[]) => {
                res.end = originalEnd;
                const result = originalEnd.apply(res, args);

                this.logResponse(res, requestData, process.hrtime(startTime));

                return result;
            };

            /// Remove headers that may expose sensitive information
            res.header('X-Powered-By', "CDR-HUIT");
            res.removeHeader("Access-Control-Allow-Origin");
            res.removeHeader("Access-Control-Allow-Credentials");
            res.removeHeader("Access-Control-Allow-Methods");
            res.set("ETag", "HUIT with luv");


            next();
        } catch (error) {
            this.logger.error(`Error in RequestLogger middleware: ${error instanceof Error ? error.message : String(error)}`);
            next();
        }
    }

    private shouldSkip(req: Request): boolean {
        const { excludePaths, excludePathRegex } = this.options;

        if (excludePaths?.some(path => req.path.startsWith(path))) {
            return true;
        }

        if (excludePathRegex?.some(regex => regex.test(req.path))) {
            return true;
        }

        return false;
    }

    private getOrGenerateRequestId(req: Request): string {
        const headerName = this.options.headerName || 'X-Request-ID';

        const headerRequestId = req.header(headerName);
        if (headerRequestId) {
            req['requestId'] = headerRequestId;
            return headerRequestId;
        }

        const newRequestId = randomUUID();
        req['requestId'] = newRequestId;
        req.headers[headerName.toLowerCase()] = newRequestId;

        return newRequestId;
    }

    private captureRequestData(req: Request, requestId: string): RequestData {
        const { method, originalUrl, path } = req;
        const ip = req.ip || req.socket.remoteAddress || req.hostname;
        const userAgent = req.get('user-agent') || '';

        const requestData: RequestData = {
            requestId,
            timestamp: new Date().toISOString(),
            method,
            originalUrl,
            path,
            ip,
            userAgent,
        };

        if (this.options.logParams) {
            requestData['params'] = this.maskSensitiveData(req.query);
        }

        if (this.options.logHeaders) {
            requestData['headers'] = this.maskSensitiveData(req.headers);
        }

        if (this.options.logBody && req.body) {
            const bodyStr = typeof req.body === 'object'
                ? JSON.stringify(this.maskSensitiveData(req.body))
                : String(req.body);

            requestData['body'] = bodyStr.length > (this.options.maxBodyLength || 1000)
                ? `${bodyStr.substring(0, this.options.maxBodyLength)}... [truncated]`
                : bodyStr;
        }

        return requestData;
    }

    private maskSensitiveData(data: any): any {
        if (!data || typeof data !== 'object') return data;

        const { sensitiveHeaders, sensitiveParams, maskText } = this.options;
        const maskedData = { ...data };

        const sensitiveKeys = [...(sensitiveHeaders || []), ...(sensitiveParams || [])].map(key => key.toLowerCase());

        Object.keys(maskedData).forEach(key => {
            if (sensitiveKeys.includes(key.toLowerCase())) {
                maskedData[key] = maskText || '[REDACTED]';
            } else if (typeof maskedData[key] === 'object' && maskedData[key] !== null) {
                maskedData[key] = this.maskSensitiveData(maskedData[key]);
            }
        });

        return maskedData;
    }

    private logRequest(requestData: RequestData): void {
        const { requestId, method, originalUrl, ip, userAgent } = requestData;

        let message = `[${requestId}] | ${method} ${originalUrl} - ${ip} - ${userAgent}`;
        this.logger.log(message);

        if ((this.options.logParams || this.options.logHeaders || this.options.logBody) &&
            (requestData.params || requestData.headers || requestData.body)) {
            const logDetails = {
                ...requestData,
                requestId: requestId,
                method: method,
                originalUrl: originalUrl,
                ip: ip,
                userAgent: userAgent,
                timestamp: requestData.timestamp,
            };

            if (typeof this.logger.debug === 'function') {
                this.logger.debug(`[${requestId}] Request details:`, logDetails);
            } else {
                this.logger.verbose?.(`[${requestId}] Request details:`, logDetails);
            }
        }
    }
    private logResponse(res: Response, requestData: RequestData, hrDuration: [number, number]): void {
        const { requestId, method, originalUrl } = requestData;
        const { statusCode } = res;
        const contentLength = res.get('content-length') || 0;

        const durationMs = (hrDuration[0] * 1000 + hrDuration[1] / 1000000).toFixed(2);

        const logMessage = `[${requestId}] ${method} ${originalUrl} ${statusCode} ${contentLength}B - ${durationMs}ms`;

        if (statusCode >= 500) {
            this.logger.error(logMessage);
        } else if (statusCode >= 400) {
            this.logger.warn(logMessage);
        } else {
            this.logger.log(logMessage);
        }
    }
}