const winston = require('winston');
const path = require('path')

module.exports = function () {
    winston.configure({
        transports: [
            new winston.transports.File({
                dirname: path.join(__dirname, 'logs'),
                filename: 'logfile.log', format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }),
            new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
        ],
        exceptionHandlers: [
            new winston.transports.File({
                dirname: path.join(__dirname, 'logs'),
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