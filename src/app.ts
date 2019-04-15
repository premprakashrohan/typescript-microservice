import * as fs from "fs";
import * as util from "util";
import * as url from "url";
import * as http from "http";
import { Logger } from "./logger";
import { IConfiguration } from "./types/config";
import express = require("express");
const readFile = util.promisify(fs.readFile);
async function getConfig() {
  let content = await readFile("./config.json", "utf8");
  return JSON.parse(content) as IConfiguration;
}

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
