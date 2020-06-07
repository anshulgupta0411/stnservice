const winston = require('winston');                                                                                                          
const expressWinston = require('express-winston');                                                                                           

winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
// Logger initialized
module.exports = winston.createLogger({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.DailyRotateFile)({
                filename: config.log.filePath,
                level : config.log.level,
                datePattern: '.yyyy-MM-dd', //Daily
                maxsize : 104857600, //100 MB 
                colorize: true
            }
          )
    ]
  });