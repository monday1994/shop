import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.json(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  }),
);

const isDevEnvironment = () => {
  return process.env.ENVIRONMENT_NAME === 'DEV';
}

class Logger {
  private logger: winston.Logger;

  constructor() {
    //todo logging to file doesn't work check it
   /* const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });*/

    //logging to console works
    const transport = new winston.transports.Console({
      format: formatter,
    });

    this.logger = winston.createLogger({
      level: isDevEnvironment() ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [transport],
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: string, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: string, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: string, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: string, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: string, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: string, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

export const logger = new Logger();
