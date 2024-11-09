const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";

module.exports = {
  //For Enabling Commands Like AUTO_STATUS_RED Type true For Disenabling Type false
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  //_________________________________________________________________________________________________________________________________
  LOGS: toBool(process.env.LOGS) || true,
  //_________________________________________________________________________________________________________________________________
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  //_________________________________________________________________________________________________________________________________
  AUTO_REACT: process.env.AUTO_REACT || 'false',
  //_________________________________________________________________________________________________________________________________
  AUDIO_DATA: process.env.AUDIO_DATA || "BOND LEGENDS-MD;BLVCKZER-MUDIYAN;https://iili.io/J6jbQ72.md.jpg",
  //_________________________________________________________________________________________________________________________________
  AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || 'false',
  //_________________________________________________________________________________________________________________________________
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU9OUUxPSmhTT0R4b0ZiWDZrZm9zWkhTK1duK25HNlVmc2cvdkRLcVluYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXZhLzl5aFJvM0JmK3pEMkNpSWZVY0dOZ1hQOHdhRjNBZHRFNHowdEhoUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3S2I5dE9aZ3FFK2NCbE9LT2ZSOEVKM0JTeUJIaU1FZ3dOS3NLMlZxZm44PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyUjFPM1NCME5GV0tGbEtEM0pERGFCdWtZdDcvWmY4Sm1SSzRsUzVaRXlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1NUE1jL2xDTFRUUG80RTVocHJVOUczdHNhV2N1V1ZobHRjNW9POXBsbU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBQTFl6STJnNTAwT1Q2dEg2NEt6ZnRxM01Yb0QzdjNIOTJaVGpBTEdWQWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0YreXdkdVpkNGVDeGF5cGpqTWFsREVnOTE4UXRKOE1JVW5YMkFYQW9IWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNVJNTktCa05Xd1kwN0l5bDEzK3FrVlZYc0hqamRFWGx5TmtHUWhHUWJGND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJwZUVvczBraUt3UTZldkxjeFhkRjc3SmJ4RHU5YmlrNlk0ZnlqRlVhVDVxeHVvbk5SSlVhN0lnY1RYVVc4TXRzMUFoUFZDaVhsTTRaOWo0c1dFUWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUzLCJhZHZTZWNyZXRLZXkiOiI5Y05CZW5hcys0dDh0RkZCb3V3ckx5VmN5MjlxNjVHVDhmN3lJNjY4Uk1ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJTkJubV9xY1RlbVNJcEVPNld1czJnIiwicGhvbmVJZCI6IjMxMzQwYmY0LTVlMjQtNDZkMi1iNTE5LWZlMTEwYmExNjZiMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrMHB1Q3ByRGY5TTY2MUFBNllOaSswczZ1WHc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2ViUFdiZHFyTXl3UTBxcFIvUklZMitsNSs4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlMxNFE1Q0VLIiwibWUiOnsiaWQiOiI5MTczMDY0NTQwNzQ6NTZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xTUHNvY05FSm1odkxrR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxDRXFDSVBid01MbWtpbzRMRDVPMkdxSTUrVU1Yb3Y2SlllQ2JEUlpqejA9IiwiYWNjb3VudFNpZ25hdHVyZSI6InAxMDdTRHBBNHRpK3Z6M1FqN0xRUzllaGZrRWliUkpFZytObmlTQmRUdjh3KzB5Qzc3bkdyM0hIV1BEWHhuMjBjdTRMQ3JQMm5PSlhha0lweU1UU2pnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIQ1BQZldGZk90T2Y5S2VYeksyT0pBc1VoRkdhSFE1ZmZwWkJJcnJGUDB0cHhyeG1ZWHAwejlvNlNQQjluejRxSFJzUklzZDRYRW5NRWh2Wko1TU5qQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNzMwNjQ1NDA3NDo1NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTd2hLZ2lEMjhEQzVwSXFPQ3crVHRocWlPZmxERjZMK2lXSGdtdzBXWTg5In19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzExMzc3MDIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ09GIn0=", //Enter Your Session Id Here
  //_________________________________________________________________________________________________________________________________
  SUDO: process.env.SUDO || "911111111111",
  //_________________________________________________________________________________________________________________________________
  SPAM_COUNT: process.env.SPAM_COUNT || "10",
  //_________________________________________________________________________________________________________________________________
  LANG: process.env.LANG || "EN",
  //_________________________________________________________________________________________________________________________________
  HANDLERS: process.env.PREFIX || '.',
  //_________________________________________________________________________________________________________________________________
  RMBG_KEY: process.env.RMBG_KEY || false,
  //_________________________________________________________________________________________________________________________________
  BRANCH: "main",
  //_________________________________________________________________________________________________________________________________
  STICKER_DATA: "🎯BOND LEGENDS-𝙼𝙳;BLVCKSER-MUDIYAN☘️",
  //_________________________________________________________________________________________________________________________________
  WELCOME_MSG: process.env.WELCOME_MSG || "👋 Hello *@user* Welcome To Our Group *@gname*\n*Total Members:* @count\n*Group Description:*\n@gdesc {pp}",
  //_________________________________________________________________________________________________________________________________
  GOODBYE_MSG: process.env.GOODBYE_MSG || "👋 GoodBye *@user* From *@gname*\n*Total Members:* @count {pp}",
  //_________________________________________________________________________________________________________________________________
  DATABASE_URL: DATABASE_URL,
  //_________________________________________________________________________________________________________________________________
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  //_________________________________________________________________________________________________________________________________
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  //_________________________________________________________________________________________________________________________________
  OWNER_NAME: process.env.OWNER_NAME || "BLVCK ZER - MUDIYAN",
  //_________________________________________________________________________________________________________________________________
  OWNER_NUMBER: process.env.OWNER_NUMBER || "911111111111",
  //_________________________________________________________________________________________________________________________________
  BOT_NAME: process.env.BOT_NAME || "BOND LEGENDS-MD",
  //_________________________________________________________________________________________________________________________________
  WORK_TYPE: process.env.MODE || "public",
  //_________________________________________________________________________________________________________________________________
  MENTION_DATA: "BLVCKZER-MUDIYAN;BOND LEGENDS;911111111111;https://iili.io/J6jbQ72.md.jpg;https://graph.org/file/bb3ac71ec991cef3d5216.mp4",
  //_________________________________________________________________________________________________________________________________
  BASE_URL: "https://abhi-api-bvws.onrender.com/",
  //_________________________________________________________________________________________________________________________________
  //Database
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
