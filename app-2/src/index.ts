import { createLogger, format, transports } from 'winston'

console.log('Hello World')

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({
      filename: 'logs/app.log',
      level: 'debug',
    }),
  ],
})

process.on('uncaughtException', (error) => {
  logger.error(`Erro global capturado: ${error.stack}`)
  process.exit(1)
})
