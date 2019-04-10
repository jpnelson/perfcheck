#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

const program = require("commander");
const glob = require("glob");

const { buildAssets } = require("./lib/webpack/build-assets");
const { serveHarness } = require("./lib/server/serve-assets");
const { runAudits, checks } = require("./lib/audit");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .option(
    "-f, --file [file]",
    "A perfcheck file to run, or glob of files to run"
  )
  .option("-a, --audits [audits]", "A comma separated list of audits to run")
  .parse(process.argv);

const audits = (program.audits && program.audits.split(",")) || [];
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
  const entries = await buildAssets({ files });
  const port = serveHarness();
  await runAudits({
    port,
    paths: Object.keys(entries).map(entry => `${entry}.html`),
    audits
  });
}

main();
