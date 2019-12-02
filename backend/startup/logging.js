const winston = require('winston');

module.exports = function () {
    winston.configure({
        transports: [
            new winston.transports.File({
                filename: 'logfile.log', format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }),
            new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
        ],
        exceptionHandlers: [
            new winston.transports.File({
                filename: 'uncaughtExceptions.log', format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }),
            new winston.transports.Console({ format: winston.format.simple() })
        ]
    });

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}