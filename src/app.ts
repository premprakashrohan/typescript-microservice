import * as fs from "fs";
import * as util from "util";
import * as url from "url";
import * as http from "http";
import { Logger } from "./logger";
import { IConfiguration } from "./types/config";
import express = require("express");
import { SongDal } from "./dal/dal-songs";

const readFile = util.promisify(fs.readFile);

async function getConfig() {
  let content = await readFile("./config.json", "utf8");
  return JSON.parse(content) as IConfiguration;
}

let conf = getConfig();
let logger = new Logger("debug");
logger.debug("running with configuration: ", JSON.stringify(conf));
let app: express.Express = express();
const songs = new SongDal();
app.get(
  "/v1/songs",
  (req: express.Request, res: express.Response): any => {
    let urlParts = url.parse(req.url, true);
    let query = urlParts.query;
    let id: string = req.query.id;
    if (id) {
      let song = songs.getSongById(id);
      res.send(song);
    } else {
      res.send(songs);
    }
  }
);

app.listen(3000, () => {
  logger.info("Service listning on port 3000!");
});
/*
async function main() {
  let conf = await getConfig();
  let logger = new Logger(conf.logLevel);
  logger.info("running with configuration: ", JSON.stringify(conf));
  http
    .createServer((req, res) => {
      let purl = url.parse(req.url, true);
      if (purl.pathname === "/hello" && req.method === "GET") {
        res.write("Hello World!");
        res.end();
        return;
      }
      res.writeHead(404);
      res.end();
    })
    .listen(3000);
}
main();
*/
