const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.MongoDB({
      level: "info",
      db: "mongodb+srv://anurag:anurag@cluster0.gq8lgqs.mongodb.net/logger?retryWrites=true&w=majority",
      collection: "log",
      options: { useUnifiedTopology: true },
    }),
    new winston.transports.Console({
      level: "info",
    }),
  ],
});

module.exports = { logger };
