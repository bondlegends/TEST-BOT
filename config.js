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
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia05HdjhLZy9Fd25yVTYzT2ZWamF4VEpFOWZlNUJtaTJFNFB1UG9rWnBVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2doOW11NWozMVc5RUgxVVpoMnRwVGVvU0lzYlQwQkFEZlI4dGJMby9CZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSjVDZzI5bDFJTTAyRWpmam1RZHhqdUN0OUM3Q2FJSzJJamVNcTJtQkVrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRXZCcUVjSkdWamtVZWFZdXZuQWtRWURHOFdFM1h2NURGWTcrMTVNc1h3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVMSWFxNkliY3UvNXAzTktEUFVQSTlPcmpoTXkwbEVaOE5kR1plUitRMGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhyN00wMXV1Njg0ejJ3NTRIcWJDMXBLSkhza09CUFpDdmM3Y3BvRUkxbDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JzZlZzNEJYNXZyOTYxcmpmRWxIL0RlYVN2VHVDdkRYUW9XdGJvN1UxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU1sbERaRlQ4WE45QzM5Vmtjb2dGRFdOVXRhdEZldGQvV09tbE5UVjBIYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJZeWc3YUxhcFJoVkNPaEZHcVBHRTAwWEVvRHZpQ3IrZ3F4ODZaZmRKa3Fxc0dJVDl0SHphMG5vMmxrY1JGWFRVanFGTzY1QlBWQ1lMT05JblcveEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJIdXBsN0tvM1UyRTBWWnVpKzNicmhRdzNqZ2xTSmpacmgxa2thdjZxcldFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJDTEhpNHU0c1IzMklfclpsYWFpV0dnIiwicGhvbmVJZCI6ImZiZTkyNjM2LTljMWQtNGVjOC04NWJiLWQ2YzNkZGFlYzUyZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4YWVwT1NUZzk3eU9DM21RaFg2MGVWSzJzeGc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0doZllLYUQvT0xpdDQ3NGYvSWkwZE80M2JRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQzSjE0NjNNIiwibWUiOnsiaWQiOiI5MTczMDY0NTQwNzQ6NTdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xTUHNvY05FTTZzdkxrR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxDRXFDSVBid01MbWtpbzRMRDVPMkdxSTUrVU1Yb3Y2SlllQ2JEUlpqejA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkRkeUk2SlgvR2pjbUJnUkRwTldROTNPSFVJSzJBemFyQTJNcGIzclVqSUs3RWJ5ckF2QmROWUh2SWpZWU8rU2JYb21ZKzhDa0Z4TzhUdnVidk0zL2h3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxaFVoejAyekxnS0lsQzA0OUI0VWkyRHlYWUc5U1l1VXlRYmdDY0x6NkxxNUxSVjhqdnh5RXRmaVZITFI0dTlQeWx0WWxsbjhadlN6OGhjSXd5MHNCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNzMwNjQ1NDA3NDo1N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTd2hLZ2lEMjhEQzVwSXFPQ3crVHRocWlPZmxERjZMK2lXSGdtdzBXWTg5In19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzExMzkxNjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ09GIn0=", //Enter Your Session Id Here
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
