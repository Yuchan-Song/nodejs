import { createWriteStream } from 'fs'; // filestream
const output = createWriteStream('stdout.log');
const errorOutput = createWriteStream('error.log')

import { Console } from 'console';
const logger = new Console(output, errorOutput);

logger.info('info message');
logger.log('log message');

logger.warn('warn message');
logger.error('error message');