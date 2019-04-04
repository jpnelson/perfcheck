const express = require("express");
const app = express();
const port = 7007;

const { cacheDir } = require("./find-cache-dir");

module.exports.serveHarness = () => {
  app.use(express.static(cacheDir));

  app.listen(port, () =>
    console.log(
      `Example app listening on port ${port}, serving from ${cacheDir}`
    )
  );
};
