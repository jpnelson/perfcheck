#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

const program = require("commander");
const glob = require("glob");

const { buildAssets } = require("./lib/build-assets");
const { serveHarness } = require("./lib/serve-harness");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .option("-d, --dev", "Run perfcheck in dev mode (watches files)")
  .option("-f, --file [file]", "A perfcheck file to run")
  .parse(process.argv);

const isDev = program.dev;
const file = path.resolve(program.file);

function getFiles(file) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(file)) {
      resolve([file]);
    }

    glob(file, function(error, files) {
      console.log(files);
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      resolve(files);
    });
  });
}

async function main() {
  const files = await getFiles(file);
  console.log(files);
  await buildAssets({ files });
  serveHarness();
}

main();
