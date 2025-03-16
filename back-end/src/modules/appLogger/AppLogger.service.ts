import { ConsoleLogger, Injectable, Logger, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class AppLoggerService {
  private contextLoggers: Map<string, LoggerService> = new Map();
  private defaultLogger: ConsoleLogger;
  
  constructor() {
    this.defaultLogger = new ConsoleLogger('Application');
  }

  getLogger(context: string): LoggerService {
    if (!this.contextLoggers.has(context)) {
      this.contextLoggers.set(context, new ConsoleLogger({
        context,
        prefix: "HUIT-CDR"
      }));
    }
    return this.contextLoggers.get(context)!;
  }

  logStartup(port: number, env: string): void {
    this.defaultLogger.log(`🚀 Application starting in ${env.toUpperCase()} mode`);
    this.defaultLogger.log(`🔌 Server listening on port ${port}`);
    this.defaultLogger.log(`📝 API Documentation available at /api/docs`);
  }

  logShutdown(signal: string): void {
    this.defaultLogger.log(`🛑 Application shutting down... (${signal})`);
  }

  logUnhandledException(error: Error): void {
    this.defaultLogger.error(`💥 Unhandled Exception: ${error.message}`, error.stack);
  }

  formatObject(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  setLogLevels(levels: LogLevel[]): void {
    Logger.overrideLogger(levels);
    this.defaultLogger.log(`🔧 Log levels set to: ${levels.join(', ')}`);
  }
}