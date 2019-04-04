#!/usr/bin/env node

const path = require("path");

const program = require("commander");

const { buildAssets } = require("./lib/build-assets");
const { serveHarness } = require("./lib/serve-harness");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .option("-f, --file <file>", "perfcheck file to run")
  .parse(process.argv);

const perfcheck = path.resolve(program.file);

buildAssets({ perfcheck }).then(() => {
  serveHarness();
});
